"use server";
import { ActionResponse, commentFormData } from "@/type/types";
import { z } from "zod";
import db from "@/lib/prisma"; // Adjust the import based on your project structure
import { revalidatePath } from "next/cache";
import { isLogin } from "@/app/utils/isLogin";
import { getLocale, getTranslations } from "next-intl/server";

export async function newComment(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  // Validate the comment using the schema

  const locale = await getLocale();
  const t = await getTranslations({
    namespace: "errors",
    locale,
  });

  const comments = await getTranslations({
    namespace: "comments",
    locale,
  });

  const commentSchema = z.object({
    comment: z.string().min(10, t("blogcomments")),
  });

  const commentValidation = commentSchema.safeParse({
    comment: formData.get("comment"),
  });

  const user = await isLogin();

  if (!commentValidation.success) {
    return {
      success: false,
      message: commentValidation.error.errors[0].message, // Return the validation error message
    };
  }

  const userEmail = user.user?.email; // Replace with actual user email retrieval logic
  const userImage = user.user?.image; // Replace with actual user image retrieval logic
  const blogSlug = formData.get("blogSlug") as string; // Assuming blogSlug is also part of the form data

  const CMT: commentFormData = {
    comment: commentValidation.data.comment, // Use validated comment
    userEmail: userEmail as string,
    userImage: userImage as string,
  };

  try {
    // Save the comment to the database
    await db.blogcomments.create({
      data: {
        blogSlug: blogSlug,
        content: CMT.comment,
        userEmail: CMT.userEmail,
        userImage: CMT.userImage,
        createdAt: new Date(), // Automatically set the createdAt timestamp
      },

    });
    await addCounter(blogSlug);
    revalidatePath(`/showblog/${blogSlug}`);
    return {
      success: true,
      message: comments("commentAdded"),
    };
  } catch (error) {
    console.error("Error saving comment:", error);
    return {
      success: false,
      message: t("unexpectedError"),
    };
  }
}


const addCounter = async (blogSlug: string) => {
  try {
    await db.blogvisitor.update({
      where: { blogSlug },
      data: { commentscounter: { increment: 1 } },
    });
    return true;
  } catch (error) {
    console.error("Error incrementing counter:", error);
    return false;
  }
};