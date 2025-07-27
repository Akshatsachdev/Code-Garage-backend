"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("./utils/error.handler");
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api/ai', ai_routes_1.default);
    app.use(error_handler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
