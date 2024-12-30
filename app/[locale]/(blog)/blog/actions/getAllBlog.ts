"use server";

import { homeSections } from "@/constant/enums";
import { client } from "@/sanity/lib/client";
import db from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// Fixed cache configuration type
const CACHE_CONFIG = {
  revalidate: 10, // default value 3600
  tags: ["sanity-blogs"],
} satisfies {
  revalidate?: number;
  tags?: string[];
};

const fetchData = async (query: string) => {
  return unstable_cache(
    async () => {
      try {
        return (await client.fetch(query)) || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    [`sanity-query-${query}`],
    CACHE_CONFIG
  )();
};

// export const getData = async (lang: string) => {
//   const serviceQuery = `*[_type=="post" && section=="${homeSections.SERVICE}" && language == "${lang}"] | order(order asc) `;

//   try {
//     const blogs = await fetchData(serviceQuery);
//     const ColllectBlogInfo=BlogsInfo(blogs)
//     return { blogs };

//   } catch (error) {
//     console.error("Error in getData:", {
//       error,
//       lang,
//       timestamp: new Date().toISOString(),
//     });

//     return {
//       service: [],
//       tecnology: [],
//       support: [],
//       free: [],
//     };
//   }
// };

export const getData = async (lang: string) => {
  const serviceQuery = `*[_type=="post" && section=="${homeSections.SERVICE}" && language == "${lang}"] | order(order asc) `;

  try {
    const blogs = await fetchData(serviceQuery);
    const collectedBlogInfo = await BlogsInfo(blogs); // Await the updated BlogsInfo function
    return { blogs: collectedBlogInfo };

  } catch (error) {
    console.error("Error in getData:", {
      error,
      lang,
      timestamp: new Date().toISOString(),
    });

    return {
      service: [],
      technology: [],
      support: [],
      free: [],
    };
  }
};



export async function revalidateCache() {
  try {
    await fetch("/api/revalidate?tag=sanity-posts", { method: "POST" });
    return { success: true };
  } catch (error) {
    console.error("Failed to revalidate cache:", error);
    return { success: false };
  }
}


const BlogsInfo = async (blogs: any) => {
  const blogInfoPromises = blogs.map(async (blog: any) => {
    const [blogCount, blogComments] = await Promise.all([
      db.blogvisitor.findUnique({
        where: {
          blogSlug: blog.slug.current
        },
        select: {
          blogSlug: true,
          counter: true
        }
      }),
      db.blogcomments.count({
        where: {
          blogSlug: blog.slug.current
        }
      })
    ]);

    return {
      ...blog,
      viewsCount: blogCount ? blogCount.counter : 0,
      commentsCount: blogComments
    };
  });

  return Promise.all(blogInfoPromises);
};