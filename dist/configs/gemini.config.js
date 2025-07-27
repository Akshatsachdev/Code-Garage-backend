"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiModel = void 0;
const vertexai_1 = require("@google-cloud/vertexai");
const vertexAI = new vertexai_1.VertexAI({
    project: process.env.GCLOUD_PROJECT_ID || '',
    location: process.env.LOCATION || 'us-central1'
});
exports.geminiModel = vertexAI.preview.getGenerativeModel({
    model: 'gemini-1.5-flash' // or gemini-1.5-pro if you want advanced reasoning
});
