"use server";

import { unstable_cache } from "next/cache";
import db from "@/lib/prisma";
import { client } from "@/sanity/lib/client";

// Define interfaces for data types
interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { url: string }; // Adjust according to actual structure
  description: string;
  categories: string[];
  publishedAt: Date;
  section: string;
  language: string;
}

interface BlogVisitor {
  blogSlug: string;
  counter: number;
  commentscounter: number;
}

interface EnrichedBlog extends Blog {
  viewsCount: number;
  commentsCount: number;
}

interface RevalidationResponse {
  revalidated: boolean;
  now: number;
}

// Cache configuration
const CACHE_CONFIG = {
  revalidate: 10,
  tags: ["sanity-blogs"],
};

// Fetch data from Sanity with caching
const fetchSanityData = async (query: string): Promise<Blog[]> => {
  return unstable_cache(
    async (): Promise<Blog[]> => {
      try {
        const data = await client.fetch(query);
        return data || [];
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
        return [];
      }
    },
    [`sanity-query-${query}`],
    CACHE_CONFIG
  )();
};

// Fetch views and comments counts from the database
const fetchDatabaseData = async (
  slugs: string[]
): Promise<{
  viewsMap: Map<string, number>;
  commentsMap: Map<string, number>;
}> => {
  if (!slugs.length) return { viewsMap: new Map(), commentsMap: new Map() };

  try {
    const blogCounts = await db.blogvisitor.findMany({
      where: { blogSlug: { in: slugs } },
      select: { blogSlug: true, counter: true, commentscounter: true },
    });

    return {
      viewsMap: new Map(
        blogCounts.map((count) => [count.blogSlug, count.counter])
      ),
      commentsMap: new Map(
        blogCounts.map((count) => [count.blogSlug, count.commentscounter])
      ),
    };
  } catch (error) {
    console.error("Error fetching database data:", error);
    return { viewsMap: new Map(), commentsMap: new Map() };
  }
};

// Enrich blog data with views and comments counts
const BlogsInfo = (
  blogs: Blog[],
  viewsMap: Map<string, number>,
  commentsMap: Map<string, number>
): EnrichedBlog[] => {
  return blogs.map((blog) => ({
    ...blog,
    viewsCount: viewsMap.get(blog.slug.current) || 0,
    commentsCount: commentsMap.get(blog.slug.current) || 0,
  }));
};

// Main data fetching function
export const getData = async (
  lang: string,
  section: string
): Promise<{ blogs: EnrichedBlog[] }> => {
  const query = `*[_type=="post" && section=="${section}" && language == "${lang}"] | order(order asc) {
    _id,
    title,
    slug,
    mainImage,
    description,
    "categories": categories[]->title,
    publishedAt,
    section,
    language
  }`;

  try {
    const blogs = await fetchSanityData(query);
    const { viewsMap, commentsMap } = await fetchDatabaseData(
      blogs.map((blog) => blog.slug.current)
    );
    const enrichedBlogs = BlogsInfo(blogs, viewsMap, commentsMap);
    return { blogs: enrichedBlogs };
  } catch (error) {
    console.error("Error in getData:", {
      error,
      lang,
      section,
      timestamp: new Date().toISOString(),
    });
    return { blogs: [] };
  }
};

// Cache revalidation function
export const revalidateCache = async (): Promise<RevalidationResponse> => {
  return unstable_cache(
    async (): Promise<RevalidationResponse> => {
      return { revalidated: true, now: Date.now() };
    },
    ["revalidate-blogs"],
    { ...CACHE_CONFIG, revalidate: 0 }
  )();
};
