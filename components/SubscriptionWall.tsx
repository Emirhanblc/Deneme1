'use client';
import React from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface SubscriptionWallProps {
  content: {
    title: string;
    excerpt: string;
    previewLength?: number;
  };
  children: React.ReactNode;
}

export default function SubscriptionWall({
  content,
  children,
}: SubscriptionWallProps) {
  const { data: session, status } = useSession();

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="subscription-wall">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // If user is authenticated and has premium access, show full content
  if (session?.user?.isPremiumMember) {
    return <>{children}</>;
  }

  // Show subscription wall for non-premium users
  return (
    <div className="subscription-wall">
      {/* Preview content */}
      <div className="preview-content">
        <h1>{content.title}</h1>
        <p className="excerpt">{content.excerpt}</p>

        {/* Show a small preview of the actual content */}
        <div className="content-preview">
          {React.Children.toArray(children).slice(
            0,
            content.previewLength || 2
          )}
        </div>
      </div>

      {/* Subscription CTA */}
      <div className="subscription-cta">
        <div className="cta-content">
          <div className="cta-icon">🔒</div>
          <h2>Premium Content Locked</h2>
          <p>
            This is premium content reserved for our subscribers. Unlock full
            access to advanced system administration and backend development
            tutorials.
          </p>

          <div className="premium-features">
            <h3>What you'll get:</h3>
            <ul>
              <li>Advanced Kubernetes & Docker tutorials</li>
              <li>Production system administration guides</li>
              <li>Backend development deep dives</li>
              <li>Security best practices</li>
              <li>Downloadable resources & code samples</li>
              <li>Priority support</li>
            </ul>
          </div>

          <div className="cta-actions">
            {session ? (
              // Authenticated but not premium
              <Link href="/pricing" className="cta-button primary">
                Upgrade to Premium
              </Link>
            ) : (
              // Not authenticated
              <>
                <Link
                  href="/auth/signin?callbackUrl=/pricing"
                  className="cta-button primary"
                >
                  Sign In & Subscribe
                </Link>
                <Link href="/pricing" className="cta-button secondary">
                  View Pricing Plans
                </Link>
              </>
            )}
          </div>

          <div className="guarantee">
            <p>30-day money-back guarantee • Cancel anytime</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .subscription-wall {
          max-width: 1000px;
          margin: 0 auto;
        }

        .preview-content {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }

        .preview-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .excerpt {
          font-size: 1.2rem;
          color: var(--muted);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .content-preview {
          opacity: 0.6;
          filter: blur(2px);
          pointer-events: none;
          user-select: none;
        }

        .subscription-cta {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .cta-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .cta-content p {
          font-size: 1.1rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .premium-features {
          text-align: left;
          background: var(--bg);
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .premium-features h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .premium-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .premium-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: var(--text);
        }

        .premium-features li:before {
          content: '✓';
          color: var(--accent);
          font-weight: 600;
          flex-shrink: 0;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .cta-button.primary {
          background: var(--accent);
          color: white;
          border: none;
        }

        .cta-button.primary:hover {
          background: var(--accent-hover);
        }

        .cta-button.secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
        }

        .cta-button.secondary:hover {
          background: var(--card-bg);
        }

        .guarantee {
          color: var(--muted);
          font-size: 0.9rem;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .subscription-cta {
            padding: 2rem 1rem;
          }

          .preview-content h1 {
            font-size: 2rem;
          }

          .cta-actions {
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
