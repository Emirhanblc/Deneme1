import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if the user is trying to access premium content
    if (req.nextUrl.pathname.startsWith('/premium')) {
      const token = req.nextauth.token;

      // If user doesn't have premium access, redirect to pricing
      if (!token?.isPremiumMember) {
        const url = new URL('/pricing', req.url);
        url.searchParams.set('redirect', req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }

    // Check if user is trying to access dashboard without authentication
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      const token = req.nextauth.token;

      // If user is not authenticated, redirect to sign in
      if (!token) {
        const url = new URL('/auth/signin', req.url);
        url.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // For premium routes, check if user has premium access
        if (req.nextUrl.pathname.startsWith('/premium')) {
          return !!token?.isPremiumMember;
        }

        // For dashboard routes, require authentication
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token;
        }

        // Allow access to all other routes
        return true;
      },
    },
  }
);

// Configure which routes to protect
export const config = {
  matcher: ['/premium/:path*', '/dashboard/:path*'],
};
