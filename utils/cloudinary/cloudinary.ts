// utils/cloudinary.ts
"use server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the type for the resource returned by Cloudinary
interface CloudinaryResource {
  secure_url: string;
}

// Define the type for the response from the Cloudinary API
interface CloudinaryApiResponse {
  resources: CloudinaryResource[];
}

// Function to get images from a specific folder in Cloudinary
export async function getImagesFromCloudinary(folder: string): Promise<string[]> {
  try {
    const response: CloudinaryApiResponse = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 500, // Adjust as needed
    });

    // Map the resources to their URLs
    const validUrls = response.resources.map((resource) => resource.secure_url);

    return validUrls;
  } catch (error: any) {
    console.error("Error fetching images:", error.message);
    throw new Error("Unable to fetch images. Please try again later.");
  }
}


export const collectWorkSamples = async (workSampleCategories: string[]): Promise<{ category: string; workSample: any[]; count: number }[]> => {
  const baseFolder = "dreamToApp/workSample/";
  const workArray: { category: string; workSample: any[]; count: number }[] = [];

  // Use Promise.all to handle multiple asynchronous calls
  const workSamplesPromises = workSampleCategories.map(async (category) => {
    const folder = baseFolder + category;
    const workSample = await getImagesFromCloudinary(folder);

    return {
      category,
      workSample,
      count: workSample?.length || 0, // Use optional chaining and default to 0
    };
  });

  // Wait for all promises to resolve
  const workSamples = await Promise.all(workSamplesPromises);
  
  // Push results into workArray
  workArray.push(...workSamples);

  console.log({workArray});
  return workArray;
};