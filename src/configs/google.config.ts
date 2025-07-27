import { VertexAI } from '@google-cloud/vertexai';
import { TranslationServiceClient } from '@google-cloud/translate';

const projectId = process.env.GCLOUD_PROJECT_ID!;
const location = process.env.LOCATION || 'us-central1';

// Initialize Vertex AI (for Gemini)
export const vertexAI = new VertexAI({ project: projectId, location });

// Initialize Translation API (for multilingual support)
export const translationClient = new TranslationServiceClient();

export const googleConfig = {
  projectId,
  location,
};
