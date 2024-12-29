"use server";

import { homeSections } from "@/constant/enums";
import { client } from "@/sanity/lib/client";
import { unstable_cache } from "next/cache";

// Fixed cache configuration type
const CACHE_CONFIG = {
  revalidate: 10, // default value 3600
  tags: ["sanity-posts"],
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

export const getData = async (lang: string) => {
  const serviceQuery = `*[_type=="post" && section=="${homeSections.SERVICE}" && language == "${lang}"] | order(order asc) `;
  const technologyQuery = `*[_type=="post" && section=="${homeSections.TECHNOLOGY}" && language == "${lang}"] | order(order asc) `;
  const supportQuery = `*[_type=="post" && section=="${homeSections.SUPPORT}" && language == "${lang}"] | order(order asc) `;
  const freeQuery = `*[_type=="post" && section=="${homeSections.FREE}" && language == "${lang}"] | order(order asc) `;

  try {
    const [service, tecnology, support, free] = await Promise.all([
      fetchData(serviceQuery),
      fetchData(technologyQuery),
      fetchData(supportQuery),
      fetchData(freeQuery),
    ]);

    return { service, tecnology, support, free };
  } catch (error) {
    console.error("Error in getData:", {
      error,
      lang,
      timestamp: new Date().toISOString(),
    });

    return {
      service: [],
      tecnology: [],
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
