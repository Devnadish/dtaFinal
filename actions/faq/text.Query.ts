import db from "@/lib/prisma";
import { FAQ, Answer } from "@/type/faq";

export interface MongoDBResponse {
  cursor?: {
    firstBatch: any[]; // Replace `any` with a more specific type if needed
  };
}
/**
 * Perform a text search on the `faq` collection.
 * @param {string} query - The search query.
 * @returns {Promise<FAQ[]>} - The search results.
 */
export async function performTextSearch(query: string): Promise<FAQ[]> {
  try {
    // Use raw MongoDB query to perform text search
    const results: MongoDBResponse = await db.$runCommandRaw({
      find: "faq", // Collection name
      filter: { $text: { $search: query } }, // Text search query
      sort: { score: { $meta: "textScore" } }, // Sort by relevance
    });

    // Check if results and results.cursor exist
    if (!results || !results.cursor) {
      throw new Error("No results found or invalid response from MongoDB");
    }

    return results.cursor.firstBatch; // Return the search results
  } catch (error) {
    console.error("Error performing text search:", error);
    throw new Error("Failed to perform text search");
  }
}

export interface MongoDBResponse {
  cursor?: {
    firstBatch: any[]; // Replace `any` with a more specific type if needed
  };
}

/**
 * Perform a text search on both `faq` and `answer` collections.
 * @param {string} query - The search query.
 * @returns {Promise<{ faqs: FAQ[], answers: Answer[] }>} - The search results.
 */
export async function performTextSearch1(
  query: string
): Promise<{ faqs: FAQ[]; answers: Answer[] }> {
  try {
    // Perform text search on the `faq` collection
    const faqResults: MongoDBResponse = await db.$runCommandRaw({
      find: "faq", // Collection name
      filter: { $text: { $search: query } }, // Text search query
      sort: { score: { $meta: "textScore" } }, // Sort by relevance
    });

    // Perform text search on the `answer` collection
    const answerResults: MongoDBResponse = await db.$runCommandRaw({
      find: "answer", // Collection name
      filter: { $text: { $search: query } }, // Text search query
      sort: { score: { $meta: "textScore" } }, // Sort by relevance
    });

    // Check if results and results.cursor exist for both collections
    if (
      !faqResults ||
      !faqResults.cursor ||
      !answerResults ||
      !answerResults.cursor
    ) {
      throw new Error("No results found or invalid response from MongoDB");
    }

    return {
      faqs: faqResults.cursor.firstBatch, // Results from the `faq` collection
      answers: answerResults.cursor.firstBatch, // Results from the `answer` collection
    };
  } catch (error) {
    console.error("Error performing text search:", error);
    throw new Error("Failed to perform text search");
  }
}
