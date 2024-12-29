import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";
import { locales, defaultLocale } from '@/i18n';

import { ROUTES } from './config/routes';
import { matchesRoute, hasAccess } from './utils/auth';
import { createLocalizedRedirect } from './utils/locale';

// Create intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    
    // Handle internationalization first
    const response = await intlMiddleware(request);
    
    // Get authentication token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Check route types
    const isPublicRoute = matchesRoute(pathname, ROUTES.public);
    const isAuthRoute = matchesRoute(pathname, ROUTES.auth);
    const isProtectedRoute = matchesRoute(pathname, ROUTES.protected);

    // Handle public routes
    if (isPublicRoute) {
      return response;
    }

    // Handle auth routes (login, register, etc.)
    if (isAuthRoute) {
      if (token) {
        // If user is already authenticated, redirect to dashboard
        return createLocalizedRedirect(request, '/dashboard');
      }
      return response;
    }

    // Handle protected routes
    if (isProtectedRoute) {
      if (!token) {
        // If user is not authenticated, redirect to login
        return createLocalizedRedirect(request, '/login');
      }
      
      // Check if user has access to the route
      if (!hasAccess(token, pathname)) {
        return createLocalizedRedirect(request, '/unauthorized');
      }
      
      return response;
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Match all pathnames except for
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};