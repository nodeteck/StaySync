import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, base64url } from 'jose';

// Decode your Base64-encoded secret to raw bytes for verification
const rawSecret = process.env.JWT_SECRET || 'your-spring-boot-secret-key';
const secret = base64url.decode(rawSecret);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  const url = req.nextUrl.clone();

  // URL of login page (root '/')
  const loginUrl = new URL('/', req.url);

  // If no token, redirect to login (root)
  if (!token) {
    // If user is already trying to access login page, just proceed
    if (url.pathname === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
      requiredClaims: ['sub', 'exp', 'iat'],
    });

    if (!payload.sub) {
      throw new Error('Invalid token: missing subject');
    }

    // If user is on root path and token is valid, redirect to /dashboard
    if (url.pathname === '/') {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // Token valid - proceed normally
    return NextResponse.next();

  } catch (error) {
    console.error('JWT verification failed:', error);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('authToken');
    return response;
  }
}

export const config = {
  matcher: [
    '/', // also check root for redirect if logged in
    '/dashboard', 
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};
