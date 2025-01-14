"use server";
import db from "@/lib/prisma";

// Fetch and process FAQ data
export async function getFaqAnalytics() {
  const faqs = await db.faq.findMany({
    include: {
      images: true,
      voiceRecordings: true,
      tagged: true,
      answers: {
        include: {
          comments: true,
        },
      },
    },
  });

  // Process data for the table
  const processedData = faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    imageCount: faq.images.length,
    voiceRecordingCount: faq.voiceRecordings.length,
    answerCount: faq.answers.length,
    tags: faq.tagged,
    commentsPerAnswer: faq.answers.map((answer) => ({
      answerId: answer.id,
      commentCount: answer.comments.length,
    })),
  }));

  return processedData;
}
