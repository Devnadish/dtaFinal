"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fetch all package requests with follow-ups

export async function getAllPackageRequests() {
  return await db.packageRequest.findMany({
    include: {
      followUps: true, // Include associated follow-ups
    },
    orderBy: {
      createdAt: "desc", // Sort by createdAt in descending order (newest first)
    },
  });
}

// Add a new follow-up

// Define the shape of the state object

// Define the shape of the state object
type State = {
  message: string;
  errors?: {
    notes?: string[];
    packageRequestId?: string[];
  };
};

export async function addFollowUp(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  // Extract data from FormData
  const notes = formData.get("notes") as string;
  const packageRequestId = formData.get("packageRequestId") as string;

  // Validate the data
  if (!notes || notes.trim() === "") {
    return {
      message: "Failed to add follow-up",
      errors: {
        notes: ["Notes are required"],
      },
    };
  }

  if (!packageRequestId) {
    return {
      message: "Failed to add follow-up",
      errors: {
        packageRequestId: ["Package Request ID is required"],
      },
    };
  }

  try {
    // Create the follow-up in the database
    await db.followUp.create({
      data: {
        notes,
        packageRequestId, // Include the required packageRequestId
      },
    });

    // Revalidate the path to refresh the data
    revalidatePath("/dashboard/clients");

    // Return success message
    return { message: "Follow-up added successfully" };
  } catch (error) {
    console.error("Failed to add follow-up:", error);
    return { message: "Failed to add follow-up" };
  }
}

// Update a follow-up
export async function updateFollowUp(
  id: string,
  status: string,
  followUpDate: Date,
  notes: string
) {
  await db.followUp.update({
    where: { id },
    data: {
      status,
      followUpDate,
      notes,
    },
  });
  revalidatePath("/dashboard/package-requests");
}

// Delete a follow-up
export async function deleteFollowUp(id: string) {
  await db.followUp.delete({
    where: { id },
  });
  revalidatePath("/dashboard/package-requests");
}
