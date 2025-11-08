import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // Validate required fields
    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate that fields are non-empty strings
    if (
      typeof body.name !== 'string' ||
      typeof body.email !== 'string' ||
      typeof body.message !== 'string' ||
      body.name.trim() === '' ||
      body.email.trim() === '' ||
      body.message.trim() === ''
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the submission (in production, integrate with email service or database)
    console.log('Contact form submission:', {
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject || 'N/A',
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
