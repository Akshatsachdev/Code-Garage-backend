"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_handler_1 = require("./response.handler");
const logger_1 = require("./logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error('Global error:', err);
    return (0, response_handler_1.errorResponse)(res, err.message || 'Internal Server Error', 500);
};
exports.errorHandler = errorHandler;
