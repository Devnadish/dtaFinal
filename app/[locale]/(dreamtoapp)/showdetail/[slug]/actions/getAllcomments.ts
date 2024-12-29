"use server";

import { auth } from "@/auth";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
export async function getAllcomments(blogSlug: string) {
  try {
    const comments = await db.blogcomments.findMany({
      where: { blogSlug: blogSlug },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  } catch (error) {
    console.error("[GET_COMMENTS]", error);
    return [];
  }
}
