"use server";

import { z } from "zod";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const CommentSchema = z.object({
  answerId: z.string().min(1),
  userEmail: z.string().email(),
  content: z.string().min(10).max(1000),
  slug: z.string().min(1),
});

type CommentInput = z.infer<typeof CommentSchema>;

type CommentState = {
  success?: string;
  error?: string;
};

export const addCommentToAnswer = async (
  prevState: CommentState,
  formData: FormData
): Promise<CommentState> => {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "User not authenticated" };
    }
    console.log(session?.user.email);

    const validatedFields = CommentSchema.parse({
      answerId: formData.get("answerId"),
      userEmail: session?.user.email,
      content: formData.get("content"),
      slug: formData.get("slug"),
    });

    const { answerId, userEmail, content, slug } = validatedFields;

    const newComment = await db.comment.create({
      data: {
        answer: {
          connect: { id: answerId },
        },
        userEmail,
        content,
        userImage: session.user.image ?? "",
      },
    });

    revalidatePath(`/detailquastion/${slug}`);
    return { success: "Comment added successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(", ");
      return { error: `Validation error: ${errorMessages}` };
    }
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
