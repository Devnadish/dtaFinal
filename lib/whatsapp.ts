// lib/whatsapp.ts

import axios from 'axios';

/**
 * Interface defining the structure of a WhatsApp notification
 * Contains all necessary information to send a notification to a company
 */
interface WhatsAppNotification {
    companyId: string;         // Unique identifier for the company
    companyWhatsApp: string;   // Company's WhatsApp number (with country code, e.g., +1234567890)
    questionId: string;        // Unique identifier for the question
    questionText: string;      // The actual question content
    questionLink: string;      // Direct URL to answer the question
}

/**
 * Service class for handling WhatsApp notifications
 * Uses WhatsApp Business API to send notifications to companies
 */
export class WhatsAppService {
    // WhatsApp Business API authentication token from environment variables
    private static token = process.env.WHATSAPP_TOKEN;

    // WhatsApp API endpoint constructed with the phone number ID
    private static apiUrl = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    /**
     * Sends a notification to a company about a new question
     * 
     * @param notification - Object containing all necessary information for the notification
     * 
     * Example usage:
     * await WhatsAppService.notifyCompany({
     *   companyId: "123",
     *   companyWhatsApp: "+1234567890",
     *   questionId: "q456",
     *   questionText: "How do I reset my password?",
     *   questionLink: "https://yourapp.com/questions/q456"
     * });
     */
    static async notifyCompany(notification: WhatsAppNotification) {
        try {
            // Construct the message payload according to WhatsApp API specifications
            const message = {
                messaging_product: "whatsapp",    // Specify we're using WhatsApp
                to: notification.companyWhatsApp,  // Recipient's WhatsApp number
                type: "template",                  // Using a message template
                template: {
                    name: "new_question_alert",    // Template name (must be pre-approved by WhatsApp)
                    language: { code: "en" },      // Template language
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    // Truncate question to 100 characters to fit WhatsApp limits
                                    text: notification.questionText.substring(0, 100)
                                },
                                {
                                    type: "text",
                                    // Direct link to answer the question
                                    text: notification.questionLink
                                }
                            ]
                        }
                    ]
                }
            };

            // Send the POST request to WhatsApp API
            await axios.post(
                this.apiUrl,
                message,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,  // Authentication
                        'Content-Type': 'application/json'        // Specify JSON content
                    }
                }
            );
        } catch (error) {
            // Log any errors but don't throw them to prevent app crashes
            console.error('WhatsApp notification error:', error);
        }
    }
}