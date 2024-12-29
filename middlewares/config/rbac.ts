import { RBACConfig } from '../types';

export const RBAC: RBACConfig = {
  adminRoutes: [
    '/admin',
    '/dashboard/manage',
    '/settings/global'
  ],
  moderatorRoutes: [
    '/dashboard/content',
    '/dashboard/users',
    '/dashboard/reports'
  ],
  userRoutes: [
    '/profile',
    '/settings/account',
    '/dashboard/personal'
  ],
  premiumRoutes: [
    '/premium',
    '/features/advanced',
    '/content/exclusive'
  ]
};