import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.handler';
import { aiChatService, expenseInsightsService } from '../services/ai.service';
import { logger } from '../utils/logger';

export const aiChatController = async (req: Request, res: Response) => {
  try {
    const { message, userId, language } = req.body;
    if (!message || !userId) {
      return errorResponse(res, 'Missing required fields', 400);
    }
    const response = await aiChatService(message, userId, language);
    return successResponse(res, response);
  } catch (error) {
    logger.error('Error in aiChatController:', error);
    return errorResponse(res, 'Failed to process chat request', 500);
  }
};

export const expenseInsightsController = async (req: Request, res: Response) => {
  try {
    const { transactions, userId } = req.body; // removed language
    if (!transactions || !userId) {
      return errorResponse(res, 'Missing required fields', 400);
    }
    const insights = await expenseInsightsService(transactions, userId); // only 2 args
    return successResponse(res, insights);
  } catch (error) {
    logger.error('Error in expenseInsightsController:', error);
    return errorResponse(res, 'Failed to generate insights', 500);
  }
};
