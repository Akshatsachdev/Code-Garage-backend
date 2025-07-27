import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.GCLOUD_PROJECT_ID || !process.env.LOCATION || !process.env.VERTEX_AI_MODEL) {
  throw new Error('Missing required environment variables for Vertex AI (GCLOUD_PROJECT_ID, LOCATION, VERTEX_AI_MODEL)');
}

const vertexAI = new VertexAI({
  project: process.env.GCLOUD_PROJECT_ID,
  location: process.env.LOCATION,
});

export const geminiModel = vertexAI.getGenerativeModel({
  model: process.env.VERTEX_AI_MODEL,
});
