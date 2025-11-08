import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Force Node.js runtime (required for Prisma)
export const runtime = 'nodejs';

// Allow this endpoint to be called without authentication
export const dynamic = 'force-dynamic';

export async function GET() {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  try {
    // Lightweight database ping
    await prisma.$queryRaw`SELECT 1`;

    // Database is healthy
    return NextResponse.json(
      {
        status: 'ok',
        db: true,
        uptime,
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error('Health check failed - Database connection error:', error);

    // Database is not available
    return NextResponse.json(
      {
        status: 'degraded',
        db: false,
        uptime,
        timestamp,
      },
      { status: 500 }
    );
  }
}

