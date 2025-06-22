// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-min-32-chars' // Always use a strong secret!
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url)); // Use absolute URL
  }

  // try {
  //   // Verify token (with proper error handling)
  //   await jwtVerify(token, secret, {
  //     algorithms: ['HS256'], // Explicitly specify algorithm
  //   });
  //   return NextResponse.next();
  // } catch (err) {
  //   // Clear invalid token and redirect
  //   const response = NextResponse.redirect(new URL('/', req.url));
  //   response.cookies.delete('authToken'); // Force logout
  //   return response;
  // }
}

export const config = {
  matcher: [
    '/dashboard', 
    '/dashboard/:path*',
    '/profile/:path*'
  ],
};