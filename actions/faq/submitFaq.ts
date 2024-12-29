'use server';

/**
 * FAQ Submission System
 * This module handles the submission of FAQs with support for images and audio attachments.
 * It includes validation, file upload handling, and database integration.
 */

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary, UploadProgress } from "@/utils/cloudinary/upload";

// Types and Interfaces
interface SubmitFaqParams {
    question: string;
    priority: number;
    images: File[];
    voiceRecording?: File;
    userPlan: string;
    userEmail: string;
    onProgress?: (fileIndex: number, progress: UploadProgress) => void;
}

// Constants for plan limits and file restrictions
const PLAN_LIMITS = {
    basic: { images: 1, voiceMinutes: 1 },
    premium: { images: 5, voiceMinutes: 5 },
    enterprise: { images: 10, voiceMinutes: 10 }
} as const;

const FILE_LIMITS = {
    image: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/']
    },
    audio: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['audio/']
    }
};

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Validates the question text
 * @param question - The question text to validate
 * @throws ValidationError if the question doesn't meet requirements
 */
const validateQuestion = (question: string): void => {
    if (!question || question.length < 10) {
        throw new ValidationError("Question must be at least 10 characters long");
    }
    if (question.length > 500) {
        throw new ValidationError("Question cannot exceed 500 characters");
    }
    if (/^[^a-zA-Z0-9]+$/.test(question)) {
        throw new ValidationError("Question cannot contain only special characters");
    }
};

/**
 * Validates the priority level
 * @param priority - The priority level (1-5)
 * @throws ValidationError if priority is invalid
 */
const validatePriority = (priority: number): void => {
    if (priority < 1 || priority > 5) {
        throw new ValidationError("Priority must be between 1 and 5");
    }
};

/**
 * Validates that the user hasn't exceeded their plan limits
 * @param params - The FAQ submission parameters
 * @throws ValidationError if plan limits are exceeded
 */
const validatePlanLimits = (params: SubmitFaqParams): void => {
    const limit = PLAN_LIMITS[params.userPlan as keyof typeof PLAN_LIMITS];
    if (!limit) {
        throw new ValidationError("Invalid user plan");
    }
    if (params.images.length > limit.images) {
        throw new ValidationError(`Your plan allows maximum of ${limit.images} images`);
    }
};

/**
 * Validates a file's type and size
 * @param file - The file to validate
 * @param type - The type of file ('image' or 'audio')
 * @throws ValidationError if file is invalid
 */
const validateFile = async (file: File, type: 'image' | 'audio'): Promise<void> => {
    const limits = FILE_LIMITS[type];
    const isValidType = limits.allowedTypes.some(allowedType => file.type.startsWith(allowedType));
    
    if (!isValidType) {
        throw new ValidationError(`Invalid ${type} file type`);
    }
    if (file.size > limits.maxSize) {
        throw new ValidationError(`${type} file size exceeds ${limits.maxSize / (1024 * 1024)}MB limit`);
    }
};

/**
 * Creates a URL-friendly slug from the question text
 * @param question - The question text
 * @returns A URL-friendly slug
 */
const createSlug = (question: string): string => {
    return question
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
};

/**
 * Checks if a similar question already exists
 * @param slug - The question slug to check
 * @throws ValidationError if a duplicate is found
 */
const checkDuplicateQuestion = async (slug: string): Promise<void> => {
    const existingFaq = await db.faq.findFirst({ where: { slug } });
    if (existingFaq) {
        throw new ValidationError("A similar question already exists");
    }
};

/**
 * Creates a new FAQ entry in the database
 * @param params - The FAQ submission parameters
 * @param slug - The URL-friendly slug
 * @returns The created FAQ entry
 */
const createFaqEntry = async (params: SubmitFaqParams, slug: string) => {
    return await db.faq.create({
        data: {
            question: params.question,
            slug,
            priority: params.priority,
            userPlan: params.userPlan,
            userEmail: params.userEmail,
            published: true,
            rejected: false,
            gotAnswer: false,
            viewerCount: 0,
            loveCount: 0,
            dislovCount: 0,
            rejectedReason: "",
        },
    });
};

/**
 * Handles the upload of files (images and audio) for a FAQ
 * @param userEmail - The email of the user
 * @param faqId - The ID of the FAQ
 * @param params - The FAQ submission parameters
 * @returns Array of uploaded file URLs
 */
const handleFileUploads = async (
    userEmail: string | undefined,
    faqId: string,
    params: SubmitFaqParams
): Promise<string[]> => {
    const urls: string[] = [];
    userEmail = userEmail ?? "khalidnadish@gmail.com";
    
    // Upload images
    if (params.images.length > 0) {
        for (let i = 0; i < params.images.length; i++) {
            const image = params.images[i];
            await validateFile(image, 'image');
            
            const imageUrl = await uploadToCloudinary(image, {
                folder: `dreamtoapp/faq/${userEmail}/FAQID:${faqId}/images`,
                resourceType: 'image',
                userEmail: userEmail,
                onProgress: (progress) => {
                    params.onProgress?.(i, progress);
                }
            });
            
            await db.faqImage.create({
                data: { 
                    url: imageUrl.secure_url,
                    publicId: imageUrl.public_id,
                    faqId 
                }
            });

            urls.push(imageUrl.secure_url);
        }
    }

    // Upload voice recording
    if (params.voiceRecording) {
        await validateFile(params.voiceRecording, 'audio');
        const audioUrl = await uploadToCloudinary(params.voiceRecording, {
            folder: `dreamtoapp/faq/${userEmail}/FAQID:${faqId}/audio`,
            resourceType: 'video', // Cloudinary uses 'video' type for audio files
            userEmail: userEmail,
            onProgress: (progress) => {
                params.onProgress?.(params.images.length, progress);
            }
        });

        await db.faqVoiceRecording.create({
            data: { 
                url: audioUrl.secure_url,
                publicId: audioUrl.public_id,
                faqId 
            }
        });
        urls.push(audioUrl.secure_url);
    }

    return urls;
};

/**
 * Main function to handle FAQ submission
 * @param params - The FAQ submission parameters
 * @returns Object containing success status and data/error
 */
export async function submitFaq(params: SubmitFaqParams) {
    try {
        // Validate inputs
        validateQuestion(params.question);
        validatePriority(params.priority);
        // validatePlanLimits(params);

        // Create slug and check for duplicates
        const slug = createSlug(params.question);
        await checkDuplicateQuestion(slug);

        // Create FAQ entry
        const faq = await createFaqEntry(params, slug);

        // Handle file uploads
        const uploadedUrls = await handleFileUploads(params.userEmail, faq.id, params);

        // Revalidate the FAQ pages
        revalidatePath('/faq');
        revalidatePath(`/faq/${slug}`);

        return {
            success: true,
            data: {
                faq,
                uploadedUrls
            }
        };
    } catch (error) {
        if (error instanceof ValidationError) {
            return {
                success: false,
                error: error.message
            };
        }
        console.error('Error submitting FAQ:', error);
        return {
            success: false,
            error: 'An unexpected error occurred while submitting your FAQ'
        };
    }
}

// Export types for client-side usage
export type SubmitFaqResult = Awaited<ReturnType<typeof submitFaq>>;