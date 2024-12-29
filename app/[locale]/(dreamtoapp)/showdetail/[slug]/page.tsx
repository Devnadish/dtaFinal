import Text from "@/components/Text";
import { urlFor } from "@/lib/imageUrl";
import fallback from "@/public/assets/image/dreamtoapp.webp";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

import { getPost } from "./actions/getPost";
import { addViewer } from "./actions/addViewer";
import { getAllcomments } from "./actions/getAllcomments";
import { getGeoLocation } from "@/utils/cloudinary/geoLocation";

import VieweCounter from "./component/VieweCounter";
import ShowComments from "./component/ShowComments";

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
  params: Promise<{ locale: string; slug: string }>;
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
    <article className="min-h-screen w-full mt-1 relative animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative w-full pb-[31.58%] mb-8 group">
        <Image
          src={urlFor(post[0].mainImage).url() || fallback}
          alt={post[0].title}
          fill
          priority
          className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        <VieweCounter counter={counter} commentlength={comments.length} />
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-6 animate-in slide-in-from-bottom duration-500">
          {post[0].title}
        </h1>

        {/* Tags */}
        {post.categories && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post[0].categories.map((category: any) => (
              <span
                key={category._id}
                className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none animate-in slide-in-from-bottom duration-500 delay-150">
          <PortableText
            value={post[0].body}
            components={{
              block: {
                normal: ({ children }) => <Text className="mb-4">{children}</Text>,
              },
            }}
          />
        </div>

        {/* Comments Section */}
        <div className="mt-16 animate-in slide-in-from-bottom duration-500 delay-300">
          <h2 className="text-2xl font-semibold mb-8">Comments</h2>
          <ShowComments initialComments={comments} blogSlug={slug} />
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/20">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `var(--scroll-progress, 0%)` }}
        />
      </div>
    </article>
  );
}