import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './utils/error.handler';
import aiRoutes from './routes/ai.routes';
import ocrRoutes from './routes/ocr.routes';
import taskRoutes from './routes/task.routes';
import { geminiModel } from './configs/gemini.config';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './configs/swagger.config';

export const createApp = (): Application => {
  const app: Application = express();

  // ✅ Middlewares
  app.use(cors()); // Enable CORS for cross-origin requests
  app.use(express.json()); // Parse JSON request bodies
  app.use(morgan('dev')); // Log HTTP requests for debugging

  // ✅ Swagger Docs (with custom UI options)
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }', // Remove topbar
      customSiteTitle: 'Project Raseed API Docs',
    })
  );

  // ✅ API Version Prefix
  const API_PREFIX = '/api/v1';

  // ✅ Base API Route
  app.get(API_PREFIX, (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'Project Raseed API v1. Use /api/docs for documentation.',
    });
  });

  // ✅ Health Check Endpoint
  app.get(`${API_PREFIX}/health`, (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });

  // ✅ API Routes
  app.use(`${API_PREFIX}/ai`, aiRoutes); // AI-related routes (e.g., Gemini integration)
  app.use(`${API_PREFIX}/ocr`, ocrRoutes); // OCR-related routes (e.g., receipt processing)
  app.use(`${API_PREFIX}/tasks`, taskRoutes); // Task management routes

  // ✅ Test Gemini API Route
  app.get(`${API_PREFIX}/test-gemini`, async (req, res) => {
    try {
      const result = await geminiModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: 'Say hello in 3 words' }] }],
      });

      const text =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      res.json({ message: text });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  });

  // ✅ Catch-All Route for 404 Errors
  app.use((req, res, next) => {
    console.log(`❌ 404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
      error: 'Not Found',
      message: `The requested endpoint ${req.originalUrl} does not exist. Check /api/docs for available routes.`,
    });
  });

  // ✅ Global Error Handler
  app.use(errorHandler);

  return app;
};