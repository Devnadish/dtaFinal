import { RBAC } from '../config/rbac';
import { stripLocale } from './locale';

export function matchesRoute(path: string, routes: string[]): boolean {
  return routes.some(route => stripLocale(path).startsWith(route));
}

export function hasAccess(token: any, pathname: string): boolean {
  if (!token?.email) return false;
  
  const strippedPath = stripLocale(pathname);
  
  // For now, we'll use email domain to determine if user is admin
  // You can modify this logic based on your needs
  const isAdmin = token.email.endsWith('@your-company.com');
  
  if (isAdmin) return true;
  
  // For regular users, allow access to basic protected routes
  return matchesRoute(strippedPath, RBAC.userRoutes);
}