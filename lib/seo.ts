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
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamto.app',
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




// interface SeoProps {
//   title: string;
//   description?: string;
//   image?: any; // Sanity image type
//   keywords?: string[];
//   author?: string;
//   publishedAt?: string;
//   modifiedAt?: string;
//   type?: 'website' | 'article';
//   canonical?: string;
//   robots?: string;
//   locale: string;
//   slug?: string;

//   // Open Graph Properties
//   ogTitle?: string;
//   ogDescription?: string;
//   ogImage?: any; // Sanity image type
//   ogType?: string; // e.g., 'website', 'article', 'video.movie', etc.
//   ogUrl?: string;
//   ogSiteName?: string;

//   // Twitter Card Properties
//   twitterCardType?: string; // e.g., 'summary', 'summary_large_image', 'player', etc.
//   twitterTitle?: string;
//   twitterDescription?: string;
//   twitterImage?: any; // Sanity image type
//   twitterSite?: string; // e.g., '@yourtwitterhandle'
//   twitterCreator?: string; // e.g., '@yourtwitterhandle'

//   // JSON-LD Schema Properties
//   jsonLdType?: string; // e.g., 'WebPage', 'Article', 'Person', etc.
//   jsonLdName?: string;
//   jsonLdHeadline?: string;
//   jsonLdDatePublished?: string;
//   jsonLdDateModified?: string;
//   jsonLdAuthor?: { name: string; url?: string; sameAs?: string[] };
//   jsonLdPublisher?: { name: string; logo?: { url: string } };
//   jsonLdImage?: any; // Sanity image type

//   // Additional Meta Tags
//   articlePublishedTime?: string;
//   articleModifiedTime?: string;
//   articleSection?: string;
//   articleTags?: string[];
//   ogLocale?: string; // e.g., 'en_US', 'en_GB'
//   ogLocaleAlternate?: string[];
// }




// ---------------------- update version ----------------------
// export function generateStructuredData({
//   type = 'article',
//   title,
//   description,
//   image,
//   author,
//   publishedAt,
//   modifiedAt,
//   locale,
//   slug,
// }: SeoProps & { type?: string }) {
//   const fullUrl = slug ? `${siteConfig.url}/${locale}/${slug}` : siteConfig.url;
//   const imageUrl = image ? urlFor(image).url() : `${siteConfig.url}/og-image.jpg`;

//   switch (type) {
//     case 'article':
//       return {
//         '@context': 'https://schema.org',
//         '@type': 'Article',
//         headline: title,
//         description,
//         image: { '@type': 'ImageObject', url: imageUrl },
//         datePublished: publishedAt,
//         dateModified: modifiedAt,
//         author: author
//           ? { '@type': 'Person', name: author }
//           : undefined,
//         publisher: {
//           '@type': 'Organization',
//           name: siteConfig.title,
//           logo: { '@type': 'ImageObject', url: `${siteConfig.url}${siteConfig.logoUrl}` },
//         },
//         mainEntityOfPage: {
//           '@type': 'WebPage',
//           '@id': fullUrl,
//         },
//       };
//     case 'website':
//       return {
//         '@context': 'https://schema.org',
//         '@type': 'WebPage',
//         name: title,
//         description,
//         image: { '@type': 'ImageObject', url: imageUrl },
//         publisher: {
//           '@type': 'Organization',
//           name: siteConfig.title,
//           logo: { '@type': 'ImageObject', url: `${siteConfig.url}${siteConfig.logoUrl}` },
//         },
//         url: fullUrl,
//       };
//     // Add cases for other types as needed
//     default:
//       return {
//         '@context': 'https://schema.org',
//         '@type': type,
//         name: title,
//         description,
//         image: { '@type': 'ImageObject', url: imageUrl },
//         url: fullUrl,
//       };
//   }
// }