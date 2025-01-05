import Text from "@/components/Text";

import { urlFor } from "@/lib/imageUrl";

import Image from "next/image";

import { notFound } from "next/navigation";

import { headers } from "next/headers";

import { auth } from "@/auth";

import { generateSEO, generateStructuredData, siteConfig } from "@/lib/seo";

import StyledBodyText from "@/components/StyledBodyText";

import type { Metadata } from "next";

import { getPost } from "./actions/getPost";

import { getAllcomments } from "./actions/getAllcomments";

import { addViewer } from "./actions/addViewer";

import VieweCounter from "./component/VieweCounter";

import ShowComments from "./component/ShowComments";

import { getIPUserInformation } from "@/app/utils/ipinfo";

type Params = {
  slug: string;

  locale: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Dream to App",

      description: "Dream To app",
    };
  }

  return generateSEO({
    title: post.seo?.metaTitle || post.title,

    description: post.seo?.metaDescription || post.description,

    image: post.mainImage,

    keywords: post.seo?.keywords || [],

    // author: post.author?.name || siteConfig.author,

    publishedAt: post.publishedAt,

    // modifiedAt: post.seo?.dateModified,

    type: "article",

    // canonical: post.seo?.canonicalUrl,

    // robots: post.seo?.robots,

    locale,

    slug: `showblog/${slug}`,
  });
}

const getHeaderData = async () => {
  const headersList = await headers();

  const ipAddress = (
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    (process.env.NODE_ENV === "development" ? "168.149.37.35" : "")
  )

    .split(",")[0]
    .trim();

  return { ipAddress };
};

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = params;

  const { ipAddress } = await getHeaderData();

  const userLocation = await getIPUserInformation(ipAddress);

  const session = await auth();

  const [post, comments] = await Promise.all([
    getPost(slug),

    getAllcomments(slug),
  ]);

  if (!post) {
    notFound();
  }

  const structuredData = generateStructuredData({
    type: "article",

    title: post.title,

    description: post.description,

    image: post.mainImage,

    // author: post.author?.name,

    publishedAt: post.publishedAt,

    // modifiedAt: post.seo?.dateModified,

    locale,

    slug: `showblog/${slug}`,
  });

  const viewerData = {
    slug,

    city: userLocation.city,

    country_name: userLocation.country,

    ip: ipAddress,

    userEmail: session?.user?.email || "visitor",

    latitude: userLocation.latitude,

    longitude: userLocation.longitude,
  };

  const { counter } = await addViewer(viewerData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article
        className="min-h-screen w-full mt-1 relative animate-in fade-in duration-500"
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className="relative w-full pb-[31.58%] mb-8 group">
          <Image
            src={urlFor(post.mainImage).url() || ""}
            alt={post.title}
            fill
            priority
            itemProp="image"
            className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />

          <VieweCounter counter={counter} commentlength={comments.length} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text
            variant="h1"
            locale={locale}
            itemProp="headline"
            className="text-4xl font-bold tracking-tight text-primary mb-6 animate-in slide-in-from-bottom duration-500"
          >
            {post.title}
          </Text>

          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <time
              itemProp="datePublished"
              dateTime={post.publishedAt.toString()}
            >
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>

            {post.author?.name && (
              <>
                <span className="mx-2">•</span>

                <span
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <span itemProp="name">{post.author.name}</span>
                </span>
              </>
            )}
          </div>

          {post.categories && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((category) => (
                <Text
                  variant="h1"
                  locale={locale}
                  key={category.title}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                >
                  {category.title}
                </Text>
              ))}
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none animate-in slide-in-from-bottom duration-500 delay-150">
            <StyledBodyText post={post} locale={locale} />
          </div>

          <ShowComments initialComments={comments} blogSlug={slug} />
        </div>
      </article>
    </>
  );
}
