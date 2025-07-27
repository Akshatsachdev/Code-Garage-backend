import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Raseed API',
      version: '1.0.0',
      description: `
**Project Raseed API** provides:
- **AI Chat & Insights** (Google Gemini)
- **OCR for Receipts** (Google Vision + Translate)
- **Task Manager with Notifications** (Firebase Cloud Messaging)
- **Google Wallet Pass Integration** (Tasks, Rewards, Receipts)
      `
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local Development Server'
      }
    ],
    tags: [
      { name: 'AI', description: 'AI Chat and Expense Insights' },
      { name: 'OCR', description: 'Receipt OCR and Processing' },
      { name: 'Tasks', description: 'Task Management & Push Notifications' },
      { name: 'Wallet', description: 'Google Wallet Pass Generation for tasks, rewards, and receipts' }
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'uuid-1234' },
            title: { type: 'string', example: 'Pay electricity bill' },
            description: { type: 'string', example: 'Pay the electricity bill before the due date.' },
            dueDate: { type: 'string', format: 'date-time', example: '2025-07-28T10:00:00Z' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'high' },
            deviceToken: { type: 'string', example: 'fcm_device_token' }
          }
        },
        OCRResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            fileUrl: { type: 'string', example: 'https://storage.googleapis.com/raseed-receipts/sample.jpg' },
            extractedText: { type: 'string', example: 'Total: ₹1500' },
            translatedText: { type: 'string', example: 'Total: 1500 Rupees' }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid.'
        },
        BadRequest: {
          description: 'Invalid request parameters.'
        }
      }
    }
  },
  apis: [path.join(__dirname, '../routes/*.ts')] // Scan all routes for Swagger annotations
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
