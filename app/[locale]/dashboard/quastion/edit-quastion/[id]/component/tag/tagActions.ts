"use server";

import db from "@/lib/prisma";
import { Tag } from "@/type/types";
import { revalidatePath } from "next/cache";

// Fetch all tags
export async function fetchTags() {
  try {
    const tags = await db.tag.findMany();
    return tags; // Return the tags as JSON
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Failed to fetch tags");
  }
}

// Add a new tag
export async function addTag(tag: string, faqId: string) {
  try {
    const newTag = await db.tagged.create({
      data: {
        tag,
        faqId,
      },
    });
    revalidatePath("/"); // Revalidate the page to refresh the data
    return newTag;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw new Error("Failed to add tag");
  }
}

// Delete a tag
export async function deleteTag(id: string) {
  try {
    await db.tagged.delete({
      where: { id },
    });
    revalidatePath("/"); // Revalidate the page to refresh the data
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw new Error("Failed to delete tag");
  }
}

// Update tags for a specific FAQ
export async function updateTags(faqId: string, tags: Tag[]) {
  console.log("Updating tags from server", tags);
  try {
    // First, remove all existing tags for the FAQ
    await db.tagged.deleteMany({
      where: { faqId },
    });

    // Then, add the new tags
    await db.tagged.createMany({
      data: tags.map((tag) => ({
        id: tag.id,
        tag: tag.tag,
        faqId,
      })),
    });

    revalidatePath("/"); // Revalidate the page to refresh the data
  } catch (error) {
    console.error("Error updating tags:", error);
    throw new Error("Failed to update tags");
  }
}
