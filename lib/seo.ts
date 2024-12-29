import { Metadata } from 'next'
import { urlFor } from "@/lib/imageUrl"

interface SeoProps {
  title: string
  description?: string
  image?: any // Sanity image type
  keywords?: string[]
  author?: string
  publishedAt?: string
  modifiedAt?: string
  type?: 'website' | 'article'
  canonical?: string
  robots?: string
  locale: string
  slug?: string
}

export const siteConfig = {
  title: 'DreamToApp',
  description: 'Make your dreams come true with our app development services',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamtoapp.com',
  logoUrl: '/logo.png', // Update with your logo path
  twitterHandle: '@yourtwitterhandle',
  author: 'khalid nadish'
}

export function generateSEO({
  title,
  description,
  image,
  keywords,
  author = siteConfig.author,
  publishedAt,
  modifiedAt,
  type = 'website',
  canonical,
  robots = 'index,follow',
  locale,
  slug
}: SeoProps): Metadata {
  
  const ogImage = image ? urlFor(image).width(1200).height(630).url() : `${siteConfig.url}/og-image.jpg`
  const fullUrl = slug ? `${siteConfig.url}/${locale}/${slug}` : siteConfig.url

  return {
    title: `${title} | ${siteConfig.title}`,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: `${title} | ${siteConfig.title}`,
      description,
      url: fullUrl,
      siteName: siteConfig.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: canonical || fullUrl,
    },
    robots,
  }
}

export function generateStructuredData({
  type = 'article',
  title,
  description,
  image,
  author,
  publishedAt,
  modifiedAt,
  locale,
  slug,
}: SeoProps & { type?: string }) {
  const fullUrl = slug ? `${siteConfig.url}/${locale}/${slug}` : siteConfig.url
  const imageUrl = image ? urlFor(image).url() : `${siteConfig.url}/og-image.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: author ? {
      '@type': 'Person',
      name: author,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.logoUrl}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  }
}