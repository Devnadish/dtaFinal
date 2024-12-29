import { RouteConfig } from '../types';

export const ROUTES: RouteConfig = {
  protected: [
    '/admin',
    '/dashboard',
    '/profile',
    '/settings',
    '/user'
  ],
  auth: [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
  ],
  public: [
    '/about',
    '/contact',
    '/faq',
    '/'
  ],
  protectedApi: [
    '/api/admin',
    '/api/user',
    '/api/dashboard'
  ]
};