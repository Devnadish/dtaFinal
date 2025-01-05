// actions/getPost.ts
import { client } from "@/sanity/lib/client";
import type { Post } from "@/sanity.types";

const fetchData = async (
  query: string,
  params: { [key: string]: any } = {}
): Promise<Post[]> => {
  try {
    const posts = await client.fetch(query, params);
    return posts || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const decodeSlug = decodeURIComponent(slug);
    const query = `*[_type=="post" && slug.current == '${decodeSlug}']`;
    const params = { slug: decodeSlug };
    const post = await fetchData(query, params);
    return post.length > 0 ? post[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};
