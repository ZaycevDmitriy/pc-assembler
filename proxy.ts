import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = new Set(['/', '/login', '/signup']);

export const isPublicPath = (pathname: string) => {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return pathname.startsWith('/api/');
};

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  const sessionCookie =
    request.cookies.get('authjs.session-token') ??
    request.cookies.get('__Secure-authjs.session-token');

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    // Исключаем API-роуты, всю служебку Next.js (_next, включая HMR-сокет) и .png-файлы.
    '/((?!api|_next|.*\\.png$).*)',
  ],
};
