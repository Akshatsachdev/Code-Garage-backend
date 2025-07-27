import { Response } from 'express';

export const successResponse = (res: Response, data: any, status: number = 200) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

export const errorResponse = (res: Response, message: string, status: number = 400) => {
  return res.status(status).json({
    success: false,
    error: message,
  });
};