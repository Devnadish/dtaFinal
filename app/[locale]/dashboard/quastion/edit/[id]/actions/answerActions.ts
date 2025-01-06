"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fetch answers for a specific question
export async function fetchAnswers(questionId: string) {
  try {
    const answers = await db.answer.findMany({
      where: { faqId: questionId },
      include: { comments: true },
    });
    return answers;
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw new Error("Failed to fetch answers");
  }
}

// Update an answer
export async function updateAnswer(id: string, content: string) {
  try {
    const updatedAnswer = await db.answer.update({
      where: { id },
      data: { content },
    });
    revalidatePath("/"); // Revalidate the page to refresh the data
    return updatedAnswer;
  } catch (error) {
    console.error("Error updating answer:", error);
    throw new Error("Failed to update answer");
  }
}

// Delete an answer
export async function deleteAnswer(id: string) {
  try {
    await db.answer.delete({
      where: { id },
    });
    revalidatePath("/"); // Revalidate the page to refresh the data
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw new Error("Failed to delete answer");
  }
}

// Add a new answer
export async function addAnswer(questionId: string, content: string) {
  try {
    const newAnswer = await db.answer.create({
      data: {
        faqId: questionId,
        content,
      },
    });
    revalidatePath("/"); // Revalidate the page to refresh the data
    return newAnswer;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw new Error("Failed to add answer");
  }
}
