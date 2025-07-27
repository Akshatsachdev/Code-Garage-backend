"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatContext = exports.saveChatHistory = void 0;
const datastore_config_1 = require("../configs/datastore.config");
const KIND = 'ChatHistory';
const saveChatHistory = async (userId, question, answer) => {
    const key = datastore_config_1.datastore.key([KIND]);
    const entity = {
        key,
        data: {
            userId,
            question,
            answer,
            timestamp: new Date().toISOString()
        }
    };
    await datastore_config_1.datastore.save(entity);
};
exports.saveChatHistory = saveChatHistory;
const getChatContext = async (userId) => {
    const query = datastore_config_1.datastore.createQuery(KIND)
        .filter('userId', '=', userId)
        .order('timestamp', { descending: true })
        .limit(10);
    const [entities] = await datastore_config_1.datastore.runQuery(query);
    return entities.map((e) => ({ question: e.question, answer: e.answer }));
};
exports.getChatContext = getChatContext;
