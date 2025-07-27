import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response.handler';
import { logger } from './logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Global error:', err);
  return errorResponse(res, err.message || 'Internal Server Error', 500);
};