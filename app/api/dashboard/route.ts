import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

// Force Node.js runtime (required for Prisma)
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user subscription data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        isPremiumMember: true,
        subscriptionTier: true,
        subscriptionEnds: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get reading progress
    const readingProgress = await prisma.readingProgress.findMany({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 10,
    });

    // Get recommendations based on user's reading history
    const recommendations = await getRecommendations(session.user.id);

    // Format the response data
    const dashboardData = {
      subscription: {
        isPremiumMember: user.isPremiumMember,
        subscriptionTier: user.subscriptionTier,
        subscriptionEnds: user.subscriptionEnds?.toISOString() || null,
        stripeCustomerId: user.stripeCustomerId,
      },
      readingProgress: readingProgress.map((progress) => ({
        contentId: progress.contentId,
        title: `Article ${progress.contentId}`, // In real app, join with content table
        progress: progress.progress,
        completed: progress.completed,
        updatedAt: progress.updatedAt.toISOString(),
      })),
      recommendations,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simple recommendation algorithm based on user's reading history
async function getRecommendations(userId: string) {
  try {
    // Get user's reading history to understand their interests
    const userProgress = await prisma.readingProgress.findMany({
      where: { userId },
      include: {
        // In a real app, you'd join with content table to get tags/categories
      },
      take: 20,
    });

    // For demo purposes, return some sample recommendations
    // In a real app, you'd implement a proper recommendation algorithm
    return [
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
      {
        id: 'postgres-performance',
        title: 'PostgreSQL Performance Tuning Guide',
        excerpt:
          'Advanced techniques for optimizing PostgreSQL database performance in high-traffic applications.',
        category: 'Database',
        readTime: '18 min read',
      },
    ];
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}
