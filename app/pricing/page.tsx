'use client';
import React from 'react';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PLANS } from '../../lib/stripe';

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (status === 'loading') return;

    if (!session) {
      // Redirect to sign in if not authenticated
      router.push('/auth/signin?callbackUrl=/pricing');
      return;
    }

    setLoading(planName);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const features = {
    free: [
      'Access to basic articles',
      'Community forum access',
      'Weekly newsletter',
      'Basic support',
    ],
    premium: [
      'All free features',
      'Premium tutorials & guides',
      'Advanced system administration content',
      'Backend development deep dives',
      'Kubernetes & Docker tutorials',
      'Security best practices',
      'Priority support',
      'Early access to new content',
      'Downloadable resources',
    ],
  };

  return (
    <div className="pricing-page">
      <div className="page-header">
        <h1 className="page-title">Choose Your Plan</h1>
        <p className="page-description">
          Unlock premium content and advanced tutorials for system
          administrators and backend developers.
        </p>
      </div>

      <div className="pricing-grid">
        {/* Free Plan */}
        <div className="pricing-card">
          <div className="pricing-header">
            <h3 className="plan-name">Free</h3>
            <div className="price">
              <span className="amount">$0</span>
              <span className="period">/forever</span>
            </div>
          </div>
          <div className="features">
            <ul>
              {features.free.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="cta-button secondary"
            onClick={() => router.push('/blog')}
          >
            Get Started Free
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="pricing-card featured">
          <div className="popular-badge">Most Popular</div>
          <div className="pricing-header">
            <h3 className="plan-name">Premium Monthly</h3>
            <div className="price">
              <span className="amount">${PLANS.monthly.price}</span>
              <span className="period">/month</span>
            </div>
          </div>
          <div className="features">
            <ul>
              {features.premium.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="cta-button"
            onClick={() => handleSubscribe(PLANS.monthly.priceId, 'monthly')}
            disabled={loading === 'monthly'}
          >
            {loading === 'monthly' ? 'Processing...' : 'Subscribe Monthly'}
          </button>
        </div>

        {/* Annual Plan */}
        <div className="pricing-card">
          <div className="pricing-header">
            <h3 className="plan-name">Premium Annual</h3>
            <div className="price">
              <span className="amount">${PLANS.annual.price}</span>
              <span className="period">/year</span>
              <div className="savings">Save 17%</div>
            </div>
          </div>
          <div className="features">
            <ul>
              {features.premium.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="cta-button"
            onClick={() => handleSubscribe(PLANS.annual.priceId, 'annual')}
            disabled={loading === 'annual'}
          >
            {loading === 'annual' ? 'Processing...' : 'Subscribe Annually'}
          </button>
        </div>

        {/* Lifetime Plan */}
        <div className="pricing-card">
          <div className="pricing-header">
            <h3 className="plan-name">Lifetime Access</h3>
            <div className="price">
              <span className="amount">${PLANS.lifetime.price}</span>
              <span className="period">one-time</span>
              <div className="savings">Best Value</div>
            </div>
          </div>
          <div className="features">
            <ul>
              {features.premium.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="checkmark">✓</span>
                  {feature}
                </li>
              ))}
              <li className="feature-item highlight">
                <span className="checkmark">✓</span>
                Lifetime access to all current and future content
              </li>
            </ul>
          </div>
          <button
            className="cta-button"
            onClick={() => handleSubscribe(PLANS.lifetime.priceId, 'lifetime')}
            disabled={loading === 'lifetime'}
          >
            {loading === 'lifetime' ? 'Processing...' : 'Get Lifetime Access'}
          </button>
        </div>
      </div>

      <div className="pricing-footer">
        <div className="guarantee">
          <h4>30-Day Money-Back Guarantee</h4>
          <p>
            If you're not satisfied with our premium content, we'll refund your
            payment within 30 days. No questions asked.
          </p>
        </div>
        <div className="security">
          <h4>Secure Payment</h4>
          <p>
            All payments are processed securely through Stripe. Your payment
            information is encrypted and never stored on our servers.
          </p>
        </div>
      </div>

      <style jsx>{`
        .pricing-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .page-description {
          font-size: 1.2rem;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .pricing-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          position: relative;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .pricing-card.featured {
          border-color: var(--accent);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }

        .plan-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
        }

        .amount {
          font-size: 3rem;
          font-weight: 700;
          color: var(--text);
        }

        .period {
          font-size: 1rem;
          color: var(--muted);
        }

        .savings {
          background: var(--accent);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .features {
          margin-bottom: 2rem;
        }

        .features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .feature-item.highlight {
          color: var(--accent);
          font-weight: 600;
        }

        .checkmark {
          color: var(--accent);
          font-weight: 600;
          flex-shrink: 0;
        }

        .cta-button {
          width: 100%;
          padding: 1rem 2rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .cta-button:hover {
          background: var(--accent-hover);
        }

        .cta-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cta-button.secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
        }

        .cta-button.secondary:hover {
          background: var(--card-bg);
        }

        .pricing-footer {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          text-align: center;
          padding: 2rem;
          background: var(--card-bg);
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .guarantee h4,
        .security h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .guarantee p,
        .security p {
          color: var(--muted);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
