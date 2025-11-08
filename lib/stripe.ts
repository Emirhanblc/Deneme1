import Stripe from 'stripe';

// Initialize Stripe with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Subscription plans configuration
export const PLANS = {
  monthly: {
    name: 'Monthly',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    price: 9.99,
    interval: 'month',
  },
  annual: {
    name: 'Annual',
    priceId: process.env.STRIPE_ANNUAL_PRICE_ID!,
    price: 99.99,
    interval: 'year',
  },
  lifetime: {
    name: 'Lifetime',
    priceId: process.env.STRIPE_LIFETIME_PRICE_ID!,
    price: 299.99,
    interval: 'lifetime',
  },
};

// Create a Stripe checkout session
export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true, email: true },
    });

    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user?.email,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
      },
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Create a portal session for subscription management
export async function createPortalSession(
  customerId: string,
  returnUrl: string
) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

// Handle Stripe webhook events
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(
        event.data.object as Stripe.Checkout.Session
      );
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  const subscriptionId = session.subscription as string;

  if (!userId || !subscriptionId) {
    console.error('Missing userId or subscriptionId in checkout session');
    return;
  }

  // Get subscription details from Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0].price.id;

  // Determine subscription tier
  let subscriptionTier = 'monthly';
  if (priceId === process.env.STRIPE_ANNUAL_PRICE_ID) {
    subscriptionTier = 'annual';
  } else if (priceId === process.env.STRIPE_LIFETIME_PRICE_ID) {
    subscriptionTier = 'lifetime';
  }

  // Calculate subscription end date
  const subscriptionEnds = new Date(subscription.current_period_end * 1000);

  // Update user subscription in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionId: subscriptionId,
      isPremiumMember: true,
      subscriptionTier: subscriptionTier,
      subscriptionEnds: subscriptionEnds,
    },
  });

  console.log(`User ${userId} subscribed to ${subscriptionTier} plan`);
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('Missing userId in subscription metadata');
    return;
  }

  const priceId = subscription.items.data[0].price.id;
  const isActive = subscription.status === 'active';

  // Determine subscription tier
  let subscriptionTier = 'monthly';
  if (priceId === process.env.STRIPE_ANNUAL_PRICE_ID) {
    subscriptionTier = 'annual';
  } else if (priceId === process.env.STRIPE_LIFETIME_PRICE_ID) {
    subscriptionTier = 'lifetime';
  }

  // Calculate subscription end date
  const subscriptionEnds = new Date(subscription.current_period_end * 1000);

  // Update user subscription in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      isPremiumMember: isActive,
      subscriptionTier: subscriptionTier,
      subscriptionEnds: subscriptionEnds,
    },
  });

  console.log(`User ${userId} subscription updated to ${subscriptionTier}`);
}

// Handle subscription cancellation
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('Missing userId in subscription metadata');
    return;
  }

  // Update user subscription in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      isPremiumMember: false,
      subscriptionId: null,
      subscriptionTier: null,
      subscriptionEnds: null,
    },
  });

  console.log(`User ${userId} subscription cancelled`);
}

// Handle successful invoice payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  if (!subscriptionId) return;

  // Get subscription to update end date
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata?.userId;

  if (!userId) return;

  // Update subscription end date
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionEnds: new Date(subscription.current_period_end * 1000),
    },
  });
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  if (!subscriptionId) return;

  // Get subscription and user
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = subscription.metadata?.userId;

  if (!userId) return;

  // Optionally send email notification about failed payment
  console.log(`Payment failed for user ${userId}`);
}

// Import Prisma client
import { prisma } from './prisma';
