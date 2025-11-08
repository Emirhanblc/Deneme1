import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
  // Get server session for authentication
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user?.id) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }

  // Fetch user data from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      isPremiumMember: true,
      subscriptionTier: true,
      subscriptionEnds: true,
      stripeCustomerId: true,
    },
  });

  // Reading progress feature is disabled
  const formattedProgress: Array<{
    contentId: string;
    title: string;
    progress: number;
    completed: boolean;
    updatedAt: string;
  }> = [];

  // Get recommendations (simplified for demo)
  const recommendations = [
    {
      id: 'kubernetes-monitoring',
      title: 'Kubernetes Monitoring with Prometheus and Grafana',
      excerpt:
        'Learn how to set up comprehensive monitoring for your Kubernetes clusters using Prometheus and Grafana.',
      category: 'DevOps',
      readTime: '15 min read',
    },
    {
      id: 'docker-best-practices',
      title: 'Docker Best Practices for Production',
      excerpt:
        'Essential Docker best practices and security considerations for production environments.',
      category: 'Containerization',
      readTime: '12 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Subscription Status */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Subscription Status
            </h2>
            <div className="space-y-4">
              {user?.isPremiumMember ? (
                <div className="space-y-3">
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Premium Member
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>Plan:</strong>{' '}
                      {user.subscriptionTier || 'Premium'}
                    </p>
                    {user.subscriptionEnds && (
                      <p>
                        <strong>Renews:</strong>{' '}
                        {user.subscriptionEnds.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {user.stripeCustomerId && (
                    <form action="/api/stripe/portal" method="POST">
                      <input
                        type="hidden"
                        name="returnUrl"
                        value={`${process.env.NEXTAUTH_URL}/dashboard`}
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 border border-border rounded-md text-foreground hover:bg-accent transition-colors"
                      >
                        Manage Subscription
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    Free Account
                  </div>
                  <p className="text-muted-foreground">
                    Upgrade to unlock premium content and features
                  </p>
                  <Link
                    href="/pricing"
                    className="block w-full px-4 py-2 bg-primary text-white text-center rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Reading Progress */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Reading Progress
            </h2>
            <div className="space-y-4">
              {formattedProgress.length > 0 ? (
                formattedProgress.map((item) => (
                  <div key={item.contentId} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-foreground">
                        {item.title}
                      </h4>
                      <span className="text-sm font-semibold text-primary">
                        {Math.round(item.progress * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${item.progress * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {item.completed ? 'Completed' : 'In Progress'}
                      </span>
                      <span>
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-3">
                    No reading progress yet
                  </p>
                  <Link
                    href="/blog"
                    className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Explore Articles
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Content */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Recommended for You
            </h2>
            <div className="space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map((article) => (
                  <div key={article.id} className="space-y-2">
                    <div className="flex gap-2 text-xs">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/blog/${article.id}`}
                      className="text-xs text-primary hover:text-primary/80 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    No recommendations available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Start reading to get personalized recommendations
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/blog"
                className="flex flex-col items-center p-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                <span className="text-lg mb-1">📚</span>
                <span className="text-xs font-medium text-center">
                  Browse Articles
                </span>
              </Link>
              {user?.isPremiumMember && (
                <Link
                  href="/premium"
                  className="flex flex-col items-center p-3 border border-border rounded-md hover:bg-accent transition-colors"
                >
                  <span className="text-lg mb-1">⭐</span>
                  <span className="text-xs font-medium text-center">
                    Premium Content
                  </span>
                </Link>
              )}
              <Link
                href="/profile"
                className="flex flex-col items-center p-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                <span className="text-lg mb-1">👤</span>
                <span className="text-xs font-medium text-center">
                  Edit Profile
                </span>
              </Link>
              <Link
                href="/settings"
                className="flex flex-col items-center p-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                <span className="text-lg mb-1">⚙️</span>
                <span className="text-xs font-medium text-center">
                  Settings
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
