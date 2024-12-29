import { client } from "@/sanity/lib/client";

export const getPost = async (slug: string) => {
  const decodeSlug = decodeURIComponent(slug);
  const POST_BY_SLUG = `*[_type=="post" && slug.current == "${decodeSlug}"]`;
  const postData = await fetchData(POST_BY_SLUG);
  return postData;
};

const fetchData = async (query: any) => {
  try {
    const post = await client.fetch(query);
    return post || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
