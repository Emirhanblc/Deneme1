import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, handleStripeWebhook } from '../../../../lib/stripe';

// Force Node.js runtime (required for Prisma)
export const runtime = 'nodejs';

// Disable body parsing, we need the raw body for webhook signature verification
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Validate environment variables
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return NextResponse.json(
      { error: 'Stripe secret key not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the webhook event
    await handleStripeWebhook(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Provide more detailed error information in development
    const errorMessage =
      process.env.NODE_ENV === 'development' && error instanceof Error
        ? error.message
        : 'Webhook signature verification failed';

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}
