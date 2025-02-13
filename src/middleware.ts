/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = [
  '/dashboard',
  '/categories',
  '/products',
  '/orders',
  '/customers',
  '/partners',
  '/support',
  '/profile',
  '/settings',

];

const publicPaths = ['/auth', '/forgot-password'];

async function fetchRefreshToken(refreshToken: string) {
  try {
    const response = await fetch('http://localhost:8000/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error('Refresh failed');

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Check for protected paths without access token
  if (isProtectedPath && !accessToken) {
    // Try refresh token if available
    if (refreshToken) {
      const tokens = await fetchRefreshToken(refreshToken);

      if (tokens) {
        // Create response with redirect to same page
        const response = NextResponse.redirect(request.url);

        // Set new cookies
        response.cookies.set('access_token', tokens.accessToken, {
          // httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 15 * 60, // 15 minutes
        });

        response.cookies.set('refresh_token', tokens.refreshToken, {
          // httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
      }
    }

    // Only redirect to signin if refresh token is invalid or not present
    const url = new URL('/auth', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // For public paths, check refresh token validity
  if (isPublicPath && refreshToken) {
    const tokens = await fetchRefreshToken(refreshToken);

    if (tokens) {
      // If refresh token is valid, redirect to dashboard with new tokens
      const response = NextResponse.redirect(
        new URL('/dashboard', request.url)
      );

      response.cookies.set('access_token', tokens.accessToken, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 15 * 60,
      });

      response.cookies.set('refresh_token', tokens.refreshToken, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }
  }

  // If user has access token and tries to access public routes
  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],



};
