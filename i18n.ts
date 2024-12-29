import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Locale configuration
export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'ar' as const;

// Create shared navigation
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});