import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define types
export type UploadFile = File | Buffer | string;
export type ResourceType = 'image' | 'video' | 'auto';

export interface UploadProgress {
  loaded: number;
  total: number;
  progress: number;
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
  duration?: number;
}

export interface CloudinaryUploadOptions {
  folder: string;
  resourceType?: ResourceType;
  userEmail?: string;
  transformation?: any;
  onProgress?: (progress: UploadProgress) => void;
}

/**
 * Uploads a file to Cloudinary
 * @param file - The file to upload (can be File, Buffer, or URL string)
 * @param options - Upload options including folder, resource type, and callbacks
 * @returns Promise resolving to upload result with secure URL and other metadata
 */
export const uploadToCloudinary = async (
  file: UploadFile,
  options: CloudinaryUploadOptions
): Promise<CloudinaryUploadResult> => {
  try {
    const uploadOptions = {
      folder: options.folder,
      resource_type: options.resourceType || 'auto',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      tags: options.userEmail ? [options.userEmail] : undefined,
      transformation: options.transformation,
    };

    let uploadResult: UploadApiResponse;

    if (file instanceof Buffer) {
      // Handle Buffer uploads
      uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(new Error(error.message));
            if (result) resolve(result);
          }
        );
        uploadStream.end(file);
      });
    } else if (typeof file === 'string') {
      // Handle URL string uploads
      uploadResult = await cloudinary.uploader.upload(file, uploadOptions);
    } else {
      // Handle File objects by converting to Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(new Error(error.message));
            if (result) resolve(result);
          }
        );
        
        // Report progress if callback is provided
        if (options.onProgress) {
          const totalSize = file.size;
          let uploadedSize = 0;
          
          uploadStream.on('data', (chunk) => {
            uploadedSize += chunk.length;
            options.onProgress?.({
              loaded: uploadedSize,
              total: totalSize,
              progress: (uploadedSize / totalSize) * 100
            });
          });
        }
        
        uploadStream.end(buffer);
      });
    }

    // Validate upload result
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Upload failed: No secure URL received from Cloudinary');
    }

    // Return standardized result
    return {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      resource_type: uploadResult.resource_type,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      duration: uploadResult.duration,
    };
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error(
      `Failed to upload file to Cloudinary: ${error.message || 'Unknown error'}`
    );
  }
};