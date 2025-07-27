"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeTrends = void 0;
const gemini_config_1 = require("../configs/gemini.config");
const logger_1 = require("../utils/logger");
// Scheduled job to analyze spending trends using Gemini
const analyzeTrends = async (userId, transactions) => {
    var _a, _b, _c, _d, _e, _f;
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
        const result = await gemini_config_1.geminiModel.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ]
        });
        const textResponse = ((_f = (_e = (_d = (_c = (_b = (_a = result.response) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) || '{}';
        logger_1.logger.info(`Trends analyzed for user ${userId}`);
        return JSON.parse(textResponse);
    }
    catch (error) {
        logger_1.logger.error('Error in analyzeTrends:', error);
        throw new Error('Failed to analyze trends');
    }
};
exports.analyzeTrends = analyzeTrends;
