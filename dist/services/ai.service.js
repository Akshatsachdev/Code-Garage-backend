"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseInsightsService = exports.aiChatService = void 0;
const gemini_config_1 = require("../configs/gemini.config");
const translation_service_1 = require("./translation.service");
const memory_service_1 = require("./memory.service");
/**
 * Handles conversational AI chat using Gemini + Translation + Context
 */
const aiChatService = async (message, userId, targetLanguage = 'en') => {
    var _a, _b, _c, _d, _e, _f;
    // Step 1: Translate input to English (Gemini works best in English)
    const translatedInput = await (0, translation_service_1.translateText)(message, 'en');
    // Step 2: Get previous context from Datastore (last 10 messages)
    const contextHistory = await (0, memory_service_1.getChatContext)(userId);
    const contextText = contextHistory.map(item => `User: ${item.question}\nAI: ${item.answer}`).join('\n');
    // Step 3: Create prompt with context + new message
    const prompt = `${contextText}\nUser: ${translatedInput}\nAI:`;
    // Step 4: Call Gemini model
    const result = await gemini_config_1.geminiModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    // Extract response text safely
    const aiResponse = ((_f = (_e = (_d = (_c = (_b = (_a = result.response) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) || 'No response generated';
    // Step 5: Save conversation in Datastore
    await (0, memory_service_1.saveChatHistory)(userId, message, aiResponse);
    // Step 6: Translate response back to user's language (if not English)
    const finalResponse = targetLanguage !== 'en'
        ? await (0, translation_service_1.translateText)(aiResponse, targetLanguage)
        : aiResponse;
    return finalResponse;
};
exports.aiChatService = aiChatService;
/**
 * Generates expense insights using Gemini
 */
const expenseInsightsService = async (transactions, userId) => {
    var _a, _b, _c, _d, _e, _f;
    const prompt = `
  Analyze the following transactions:
  ${JSON.stringify(transactions)}
  
  Provide:
  - Spending trends
  - Budget recommendations
  - Potential savings tips
  Return response in plain text format.
  `;
    const result = await gemini_config_1.geminiModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    // Extract response safely
    return ((_f = (_e = (_d = (_c = (_b = (_a = result.response) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) || 'No insights generated';
};
exports.expenseInsightsService = expenseInsightsService;
