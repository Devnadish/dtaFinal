import Text from "@/components/Text";
import { urlFor } from "@/lib/imageUrl";
import fallback from "@/public/assets/image/dreamtoapp.webp";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { generateSEO, generateStructuredData, siteConfig } from '@/lib/seo'

import { getPost } from "./actions/getPost";
import { addViewer } from "./actions/addViewer";
import { getAllcomments } from "./actions/getAllcomments";
import { getGeoLocation } from "@/utils/cloudinary/geoLocation";

import VieweCounter from "./component/VieweCounter";
import ShowComments from "./component/ShowComments";
import StyledBodyText from "@/components/StyledBodyText";


import type { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // Fetch the post based on the slug
  const { slug, locale } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {
      title: 'Dream to App',
      description: 'Dream To app',
    };
  }
  console.log(post)
  // Generate and return metadata based on the post
  return generateSEO({
    title: post[0].seo?.metaTitle || post[0].title,
    description: post[0].seo?.metaDescription || post[0].description,
    image: post[0].mainImage,
    keywords: post[0].seo?.keywords || post[0].tags,
    author: post[0].author?.name || siteConfig.author,
    publishedAt: post[0].publishedAt,
    modifiedAt: post[0].seo?.dateModified,
    type: 'article',
    canonical: post[0].seo?.canonicalUrl,
    robots: post[0].seo?.robots,
    locale: locale,  // Changed: access locale from params
    slug: `showdetail/${slug}`,  // Changed: access slug from params
  });
}
   
 

// Helper function to get header data
const getHeaderData = async () => {
  const headersList = await headers();
  const ipAddress = (headersList.get('x-forwarded-for') || 
                    headersList.get('x-real-ip') || 
                    process.env.NODE_ENV === 'development' ? "168.149.37.35" : "")
                   .split(',')[0]
                   .trim();
  return { ipAddress };
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string ,slug: string}>
}) {
  const { locale, slug } = await params;
  const { ipAddress } = await getHeaderData();
  const session = await auth();

  // Fetch all data in parallel
  const [location, post, comments] = await Promise.all([
    getGeoLocation(ipAddress),
    getPost(slug),
    getAllcomments(slug)
  ]);

  if (!post) {
    notFound();
  }
  if (location.error) {
    console.warn('Geolocation failed:', location.error);
  }

  const structuredData = generateStructuredData({
    type: 'article',
    title: post[0].title,
    description: post[0].description,
    image: post[0].mainImage,
    author: post[0].author?.name,
    publishedAt: post[0].publishedAt,
    modifiedAt: post[0].seo?.dateModified,
    locale: locale,
    slug: `showdetail/${slug}`
  });

  // Prepare viewer data
  const viewerData = {
    slug,
    city: location.city,
    country_name: location.country,
    ip: ipAddress,
    userEmail: session?.user?.email || 'visitor',
    latitude: location.latitude,
    longitude: location.longitude
  };

  // Add viewer and get counter
  const { counter } = await addViewer(viewerData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="min-h-screen w-full mt-1 relative animate-in fade-in duration-500" itemScope itemType="https://schema.org/Article">
        {/* Hero Section */}
        <div className="relative w-full pb-[31.58%] mb-8 group">
          <Image
            src={urlFor(post[0].mainImage).url() || fallback}
            alt={post[0].title}
            fill
            priority
            itemProp="image"
            className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          <VieweCounter counter={counter} commentlength={comments.length} />
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <Text variant="h1" locale={locale} itemProp="headline" className="text-4xl font-bold tracking-tight text-primary mb-6 animate-in slide-in-from-bottom duration-500">
            {post[0].title}
          </Text>

          {/* Meta Information */}
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <time itemProp="datePublished" dateTime={post[0].publishedAt}>
              {new Date(post[0].publishedAt).toLocaleDateString()}
            </time>
            {post[0].author?.name && (
              <>
                <span className="mx-2">•</span>
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{post[0].author.name}</span>
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          {post[0].categories && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post[0].categories.map((category: any) => (
                <Text variant="h1" locale={locale} key={category._id} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {category.title}
                </Text>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none animate-in slide-in-from-bottom duration-500 delay-150">
          <StyledBodyText post={post[0]} locale={locale}/>
           
          </div>

          {/* Comments Section */}
          <ShowComments initialComments={comments} blogSlug={slug} />
        </div>
      </article>
    </>
  );
}