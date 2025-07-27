import dotenv from 'dotenv';
import path from 'path';
import { createApp } from './app';
import { logger } from './utils/logger';

dotenv.config();

// Ensure GOOGLE_APPLICATION_CREDENTIALS is an absolute path
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    logger.info(`Using Google credentials from: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
}

const PORT = process.env.PORT || 3000;
const app = createApp();

function startServer() {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

startServer();
