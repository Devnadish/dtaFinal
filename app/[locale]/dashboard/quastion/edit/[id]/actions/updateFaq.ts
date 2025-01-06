"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
type State = {
  message: string;
  errors?: {
    notes?: string[];
    packageRequestId?: string[];
  };
};

export async function editFaq(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  // Extract data from FormData
  const question = formData.get("question") as string;
  const QID = formData.get("QID") as string;

  // Validate the data
  if (!question || question.trim() === "") {
    return {
      message: "Failed to add follow-up",
      errors: {
        notes: ["Notes are required"],
      },
    };
  }

  try {
    // Create the follow-up in the database
    await db.faq.update({
      where: { id: QID },
      data: {
        question,
      },
    });

    // revalidatePath("/dashboard/clients");

    // Return success message
    return { message: "Quastion Updated successfully" };
  } catch (error) {
    console.error("Failed to Update Quastion:", error);
    return { message: "Failed to Update Quastion" };
  }
}

export async function DELETEanswer(QID: string) {
  try {
    await db.answer.delete({
      where: { id: QID },
    });
    revalidatePath("/dashboard/quastion");
    return { message: "Faq deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete FAQ");
  }
}

export async function updateAnswer(id: string, content: string) {
  try {
    // Update the answer in MongoDB using Prisma
    const updatedAnswer = await db.answer.update({
      where: { id },
      data: { content },
    });

    // Revalidate the page to refresh the data
    revalidatePath("/"); // Replace with the path of your page

    return updatedAnswer;
  } catch (error) {
    console.error("Failed to update answer:", error);
    throw new Error("Failed to update answer");
  }
}
