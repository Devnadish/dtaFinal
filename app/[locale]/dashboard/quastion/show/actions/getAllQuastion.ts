"use server";
import db from "@/lib/prisma";

function getWhereCondition(SP: string) {
  switch (SP) {
    case "published":
      return { published: true };
    case "offline":
      return { published: false };
    case "rejected":
      return { rejected: true };
    case "answered":
      return { gotAnswer: true };
    case "pending":
      return { gotAnswer: false };
    case "all":
      return {}; // Includes all items without filtering
    default:
      return {}; // Handles unknown SP values
  }
}

// Usage example:

export const faqs = async (SP: string) => {
  try {
    const whereCondition = getWhereCondition(SP);
    const faqsData = await db.faq.findMany({
      where: whereCondition,
      include: {
        answers: { include: { comments: true } },
        images: true,
        voiceRecordings: true,
        faqInteractions: true,
        tagged: true,
      },
    });
    return faqsData;
  } catch (error) {
    console.error("Error fetching faqs:", error);
    throw error;
  }
};
