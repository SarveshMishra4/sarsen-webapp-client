/**
 * src/middleware.ts
 *
 * Next.js route protection middleware.
 * Runs automatically before every page load for matched routes.
 * No imports needed from other files — reads cookies directly.
 *
 * Protected routes:
 *   /user/dashboard/*  → requires user_token cookie
 *   /admin/dashboard/* → requires admin_token cookie
 *
 * If the cookie is missing → redirect to the appropriate login page.
 * The original URL is passed as ?redirect= so after login the user
 * can be sent back to where they were trying to go.
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userToken  = req.cookies.get('user_token')?.value;
  const adminToken = req.cookies.get('admin_token')?.value;

  // Protect user dashboard
  if (pathname.startsWith('/user/dashboard')) {
    if (!userToken) {
      const loginUrl = new URL('/user/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Tell Next.js which routes this middleware applies to.
// Add any future protected routes here.
export const config = {
  matcher: [
    '/user/dashboard/:path*',
    '/admin/dashboard/:path*',
  ],
};