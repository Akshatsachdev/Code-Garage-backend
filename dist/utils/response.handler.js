"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, status = 200) => {
    return res.status(status).json({
        success: true,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message, status = 400) => {
    return res.status(status).json({
        success: false,
        error: message,
    });
};
exports.errorResponse = errorResponse;
