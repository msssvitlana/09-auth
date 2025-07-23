// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  const response = NextResponse.next();
  let hasValidSession = false;


  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkServerSession();
      if (sessionResponse.status === 200) {
        hasValidSession = true;

        const setCookieHeader = sessionResponse.headers['set-cookie'];
        if (setCookieHeader) {
          const cookieArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);

            if (parsed.accessToken) {
              response.cookies.set('accessToken', parsed.accessToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
              });
            }

            if (parsed.refreshToken) {
              response.cookies.set('refreshToken', parsed.refreshToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
    }
  }


  if (accessToken || hasValidSession) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  }


  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
