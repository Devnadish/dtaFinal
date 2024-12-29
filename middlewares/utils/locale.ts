import { NextRequest, NextResponse } from 'next/server';

export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/[^/]+/, '');
}

export function createLocalizedRedirect(request: NextRequest, destination: string): NextResponse {
  const locale = request.nextUrl.pathname.split('/')[1];
  return NextResponse.redirect(new URL(`/${locale}${destination}`, request.url));
}

export function getLocale(request: NextRequest): string {
  return request.nextUrl.pathname.split('/')[1];
}