"use server";
import db from "@/lib/prisma";

export async function getQusationById(id: string) {
  try {
    const quastion = await db.faq.findUnique({
      where: { id },
      include: {
        answers: { include: { comments: true } },
        images: true,
        voiceRecordings: true,
        faqInteractions: true,
        tagged: true,
      },
    });

    return quastion;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw new Error("Failed to fetch FAQs");
  }
}
