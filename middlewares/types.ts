import { NextRequest, NextResponse } from 'next/server';

export type Locale = 'en' | 'ar' | 'fr' | 'es';
export type UserRole = 'admin' | 'moderator' | 'user' | 'premium';

export interface LocaleConfig {
  available: Locale[];
  default: Locale;
  prefix: 'always' | 'as-needed' | 'never';
}

export interface RouteConfig {
  protected: string[];
  auth: string[];
  public: string[];
  protectedApi: string[];
}

export interface RBACConfig {
  [key: string]: string[];
}

export interface MiddlewareUtils {
  stripLocale: (pathname: string) => string;
  matchesRoute: (path: string, routes: string[]) => boolean;
  hasAccess: (token: any, pathname: string) => boolean;
  createLocalizedRedirect: (request: NextRequest, destination: string) => NextResponse;
}