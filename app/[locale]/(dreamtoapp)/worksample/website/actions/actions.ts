"use server";

import { unstable_cache } from "next/cache";
import db from "@/lib/prisma";

// Fetch all worksamples
export async function getWorksamplesWebsites(type: string) {
  try {
    const worksamples = await db.worksamples.findMany({
      where: {
        type,
      },
    });
    return worksamples;
  } catch (error) {
    throw new Error("Failed to fetch worksamples");
  }
}

// Add a new worksample
export async function addWorksample(formData: FormData) {
  try {
    const { name, link, image } = Object.fromEntries(formData.entries());
    const newWorksample = await db.worksamples.create({
      data: {
        name: name as string,
        link: link as string,
        image: image as string,
      },
    });
    return newWorksample;
  } catch (error) {
    throw new Error("Failed to add worksample");
  }
}

// Update a worksample
export async function updateWorksample(id: string, formData: FormData) {
  try {
    const { name, link, image } = Object.fromEntries(formData.entries());
    const updatedWorksample = await db.worksamples.update({
      where: { id },
      data: {
        name: name as string,
        link: link as string,
        image: image as string,
      },
    });
    return updatedWorksample;
  } catch (error) {
    throw new Error("Failed to update worksample");
  }
}

// Delete a worksample
export async function deleteWorksample(id: string) {
  try {
    await db.worksamples.delete({
      where: { id },
    });
    return { message: "Worksample deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete worksample");
  }
}
