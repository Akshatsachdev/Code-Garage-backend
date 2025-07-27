import { geminiModel } from '../configs/gemini.config';
import { translateText } from './translation.service';

// Temporary in-memory store for chat context
const chatMemory: Record<string, { question: string; answer: string }[]> = {};

/**
 * Handles conversational AI chat using Gemini + Translation + Context
 */
export const aiChatService = async (message: string, userId: string, targetLanguage: string = 'en') => {
  // Step 1: Translate input to English
  const translatedInput = await translateText(message, 'en');

  // Step 2: Get previous context from memory
  const contextHistory = chatMemory[userId] || [];
  const contextText = contextHistory.map(item => `User: ${item.question}\nAI: ${item.answer}`).join('\n');

  // Step 3: Create prompt
  const prompt = `${contextText}\nUser: ${translatedInput}\nAI:`;

  // Step 4: Call Gemini model
  const result = await geminiModel.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });

  const aiResponse = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

  // Step 5: Save to memory
  if (!chatMemory[userId]) chatMemory[userId] = [];
  chatMemory[userId].push({ question: message, answer: aiResponse });
  if (chatMemory[userId].length > 10) chatMemory[userId].shift(); // Keep last 10

  // Step 6: Translate back to user's language if needed
  const finalResponse = targetLanguage !== 'en'
    ? await translateText(aiResponse, targetLanguage)
    : aiResponse;

  return finalResponse;
};

/**
 * Generates expense insights using Gemini
 */
export const expenseInsightsService = async (transactions: any[], userId: string) => {
  const prompt = `
  Analyze the following transactions:
  ${JSON.stringify(transactions)}
  
  Provide:
  - Spending trends
  - Budget recommendations
  - Potential savings tips
  Return response in plain text format.
  `;

  const result = await geminiModel.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });

  return result.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No insights generated';
};
