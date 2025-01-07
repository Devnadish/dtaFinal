"use server";

import db from "@/lib/prisma"; // Adjust the import based on your Prisma client setup
import { revalidatePath } from "next/cache";

interface UpdateFaqSettingsParams {
  faqId: string;
  published?: boolean;
  rejected?: boolean;
  gotAnswer?: boolean;
  rejectedReason?: string;
}

export async function updateFaqSettings({
  faqId,
  published,
  rejected,
  gotAnswer,
  rejectedReason,
}: UpdateFaqSettingsParams) {
  try {
    // Validate input
    if (!faqId) {
      throw new Error("FAQ ID is required.");
    }

    // Update the FAQ settings in the database
    const updatedFaq = await db.faq.update({
      where: { id: faqId },
      data: {
        published,
        rejected,
        gotAnswer,
        rejectedReason: rejected ? rejectedReason : "", // Clear rejectedReason if rejected is false
      },
    });

    // Revalidate the cache for the FAQ page (if using Next.js caching)
    revalidatePath(`/faq/${updatedFaq.slug}`);

    return {
      success: true,
      message: "FAQ settings updated successfully.",
      data: updatedFaq,
    };
  } catch (error) {
    console.error("Error updating FAQ settings:", error);
    return { success: false, message: "Failed to update FAQ settings." };
  }
}
