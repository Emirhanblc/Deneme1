import { NextRequest, NextResponse } from 'next/server';

// Simple email service - in production, integrate with Nodemailer, Resend, or SendGrid
async function sendEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // In production, implement actual email sending logic here
  // For now, we'll just log the data and simulate success

  console.log('Contact form submission received:');
  console.log('Name:', formData.name);
  console.log('Email:', formData.email);
  console.log('Subject:', formData.subject);
  console.log('Message:', formData.message);

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Validate required fields
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Mesajınız en az 10 karakter olmalıdır' },
        { status: 400 }
      );
    }

    // Send email (in production, this would actually send an email)
    const emailResult = await sendEmail(formData);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Email gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
        { status: 500 }
      );
    }

    // In production, you might want to store the contact form submission in a database
    // await prisma.contactSubmission.create({
    //   data: {
    //     name,
    //     email,
    //     subject,
    //     message,
    //     ip: request.ip || 'unknown',
    //     userAgent: request.headers.get('user-agent') || 'unknown'
    //   }
    // });

    return NextResponse.json(
      {
        message:
          'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}

// Optional: Add rate limiting to prevent spam
// You can implement rate limiting using Redis or similar services
function isRateLimited(ip: string): boolean {
  // Simple rate limiting - in production, use a proper rate limiting solution
  // This is just a basic example
  const rateLimitWindow = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  // In production, you'd store this in Redis or similar
  // For now, we'll just return false (no rate limiting)
  return false;
}
