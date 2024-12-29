import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL of your website
  const baseUrl = 'https://your-domain.com' // Replace with your actual domain

  // Define your static routes
  const routes = ['', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // Add routes for both languages
  const localeRoutes = ['en', 'ar'].flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.url.replace(baseUrl, '')}`,
      lastModified: route.lastModified,
      changeFrequency: 'daily' as const,
      priority: route.priority,
    }))
  )

  return [...localeRoutes]
}