"use server";
import db from "@/lib/prisma";

interface ViewerProp {
  slug: string;
  city: string;
  country_name: string;
  ip: string;
  userEmail: string;
  latitude: number;
  longitude: number;
}

export async function addViewer({
  slug: blogSlug,
  city,
  country_name,
  ip,
  userEmail,
  latitude,
  longitude,
}: ViewerProp) {
  // Convert coordinates to strings before any database operations
  const latitudeStr = latitude?.toString();
  const longitudeStr = longitude?.toString();

  try {
    // Check if a blog visitor entry already exists
    const existingBlogVisitor = await db.blogvisitor.findUnique({
      where: { blogSlug },
    });

    if (!existingBlogVisitor) {
      // Create a new blog visitor entry if it doesn't exist
      const newBlogVisitor = await db.blogvisitor.create({
        data: {
          blogSlug,
          counter: 1,
          visitorsInformation: {
            create: {
              ip,
              browser: "",
              os: "",
              userEmail,
              ...(country_name ? { country: country_name } : {}),
              ...(city ? { city } : {}),
              ...(latitudeStr ? { latitude: latitudeStr } : {}),
              ...(longitudeStr ? { longitude: longitudeStr } : {})
            },
          },
        },
      });
      return { counter: newBlogVisitor.counter };
    } else {
      // Update the existing blog visitor entry
      const updatedBlogVisitor = await db.blogvisitor.update({
        where: { blogSlug },
        data: {
          counter: {
            increment: 1,
          },
          visitorsInformation: {
            create: {
              ip,
              browser: "",
              os: "",
              userEmail,
              ...(country_name ? { country: country_name } : {}),
              ...(city ? { city } : {}),
              ...(latitudeStr ? { latitude: latitudeStr } : {}),
              ...(longitudeStr ? { longitude: longitudeStr } : {})
            },
          },
        },
      });
      return { counter: updatedBlogVisitor.counter };
    }
  } catch (error) {
    console.error("Error in addViewer:", error);
    throw new Error("Failed to add/update viewer");
  }
}