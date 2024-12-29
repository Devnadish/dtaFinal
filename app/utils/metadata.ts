import { Metadata } from 'next'
import { routing } from '@/i18n/routing'

type GenerateMetadataProps = {
  title?: string
  description?: string
  locale: string
  path?: string
}

const defaultMetadata = {
  title: 'Dream To App',
  description: 'Turn your dreams into reality with our app development services',
  images: [
    {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Dream To App - Social Preview',
    },
  ],
}

export function generateMetadata({
  title,
  description,
  locale,
  path = '',
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'
  
  // Ensure locale is valid or use default
  const validLocale = routing.locales.includes(locale as any) 
    ? locale 
    : routing.defaultLocale;
  
  // Translations for metadata based on locale
  const translations = {
    en: {
      title: title || defaultMetadata.title,
      description: description || defaultMetadata.description,
    },
    ar: {
      title: title || 'دريم تو آب',
      description: description || 'حول أحلامك إلى واقع مع خدمات تطوير التطبيقات لدينا',
    },
  }

  const localizedData = translations[validLocale as keyof typeof translations] || translations[routing.defaultLocale]

  return {
    title: localizedData.title,
    description: localizedData.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: Object.fromEntries(
        routing.locales.map(loc => [
          loc,
          `${baseUrl}/${loc}${path}`
        ])
      ),
    },
    openGraph: {
      title: localizedData.title,
      description: localizedData.description,
      images: defaultMetadata.images,
      locale: validLocale,
      alternateLocale: routing.locales.filter(l => l !== validLocale),
    },
  }
}