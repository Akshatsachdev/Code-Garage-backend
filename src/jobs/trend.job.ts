import { geminiModel } from '../configs/gemini.config';
import { logger } from '../utils/logger';

interface Transaction {
  amount: number;
  category: string;
  date: string;
  description?: string;
}

// Scheduled job to analyze spending trends using Gemini
export const analyzeTrends = async (userId: string, transactions: Transaction[]) => {
  try {
    const prompt = `
      Analyze transaction trends for user ${userId}:
      Transactions: ${JSON.stringify(transactions)}
      Identify recurring patterns and suggest alerts for unusual spending.
      Format response as JSON:
      {
        "trends": ["trend1", "trend2", ...],
        "alerts": ["alert1", "alert2", ...]
      }
    `;

    // Vertex AI requires `contents` array format
    const result = await geminiModel.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    });

    const textResponse = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    
    logger.info(`Trends analyzed for user ${userId}`);
    return JSON.parse(textResponse);
  } catch (error) {
    logger.error('Error in analyzeTrends:', error);
    throw new Error('Failed to analyze trends');
  }
};
