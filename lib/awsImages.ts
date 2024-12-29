"use server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { AWSs3Client } from "./s3Client";

// Create an S3 client

const awsUrl = "https://dreamtoapp-worksample.s3.eu-north-1.amazonaws.com/";

export async function getImages(prefix: string) {
  const params = {
    Bucket: process.env.GALLARY_BUCKET_NAME as string,
    Prefix: prefix,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const { Contents = [] } = await AWSs3Client.send(command);

    // Filter out invalid image keys and return full URLs
    const validUrls = Contents.filter(
      ({ Key }) => Key && !Key.endsWith("/")
    ).map(({ Key }) => `${awsUrl}${Key}`);

    return validUrls;
  } catch (error: any) {
    console.error("Error fetching images:", error.message);
    throw new Error("Unable to fetch images. Please try again later.");
  }
}



// "use server";
// import { Cloudinary } from 'cloudinary-core';

// // Initialize Cloudinary
// const cloudinary = new Cloudinary({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   secure: true 
// });

// // Function to get images from a specific folder in Cloudinary
// export async function getImages(folder: string) {
//   try {
//     const response = await cloudinary.api.resources({
//       type: 'upload',
//       prefix: folder,
//       max_results: 500, // Adjust as needed
//     });

//     // Map the resources to their URLs
//     const validUrls = response.resources.map(({ secure_url }) => secure_url);

//     return validUrls;
//   } catch (error) {
//     console.error("Error fetching images:", error.message);
//     throw new Error("Unable to fetch images. Please try again later.");
//   }
// }