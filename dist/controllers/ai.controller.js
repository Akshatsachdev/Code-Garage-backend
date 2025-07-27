"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseInsightsController = exports.aiChatController = void 0;
const response_handler_1 = require("../utils/response.handler");
const ai_service_1 = require("../services/ai.service");
const logger_1 = require("../utils/logger");
const aiChatController = async (req, res) => {
    try {
        const { message, userId, language } = req.body;
        if (!message || !userId) {
            return (0, response_handler_1.errorResponse)(res, 'Missing required fields', 400);
        }
        const response = await (0, ai_service_1.aiChatService)(message, userId, language);
        return (0, response_handler_1.successResponse)(res, response);
    }
    catch (error) {
        logger_1.logger.error('Error in aiChatController:', error);
        return (0, response_handler_1.errorResponse)(res, 'Failed to process chat request', 500);
    }
};
exports.aiChatController = aiChatController;
const expenseInsightsController = async (req, res) => {
    try {
        const { transactions, userId } = req.body; // removed language
        if (!transactions || !userId) {
            return (0, response_handler_1.errorResponse)(res, 'Missing required fields', 400);
        }
        const insights = await (0, ai_service_1.expenseInsightsService)(transactions, userId); // only 2 args
        return (0, response_handler_1.successResponse)(res, insights);
    }
    catch (error) {
        logger_1.logger.error('Error in expenseInsightsController:', error);
        return (0, response_handler_1.errorResponse)(res, 'Failed to generate insights', 500);
    }
};
exports.expenseInsightsController = expenseInsightsController;
