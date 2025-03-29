// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('userInfo')?.value;
//   console.log('tok: ', token);

//   // If user is not authenticated, redirect to login
//   if (!token) {
//     return NextResponse.redirect(new URL('/signin', req.url));
//   }

//   return NextResponse.next();
// }

// // Protect only these routes
// export const config = {
//   matcher: ['/my-orders', '/profile', '/checkout'], // Add your protected routes here
// };

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userInfo = req.cookies.get('userInfo')?.value;

  // 🔹 Protected user routes
  if (pathname.startsWith('/profile') || pathname.startsWith('/my-orders')) {
    if (!userInfo) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  // 🔹 Admin-only routes
  if (pathname.startsWith('/admin')) {
    if (!userInfo) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Parse userInfo JSON to check isAdmin
    const user = JSON.parse(userInfo);
    if (!user.isAdmin) {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to home if not admin
    }
  }

  return NextResponse.next(); // Allow access
}
export const config = {
  matcher: ['/profile', '/my-orders', '/checkout', '/admin/:path*'], // Matches all admin routes
};
