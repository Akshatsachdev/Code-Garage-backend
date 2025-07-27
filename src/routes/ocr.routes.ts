import { Router } from 'express';
import multer from 'multer';
import { processReceipt } from '../controllers/ocr.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router();

/**
 * @swagger
 * /ocr/process-receipt:
 *   post:
 *     summary: Upload and process a receipt (image, video, or audio)
 *     tags:
 *       - OCR
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               receipt:
 *                 type: string
 *                 format: binary
 *                 description: "The file to upload (image, video, or audio)"
 *               targetLang:
 *                 type: string
 *                 description: "Target language for translation (default: en)"
 *     responses:
 *       200:
 *         description: Successfully processed the receipt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 fileUrl:
 *                   type: string
 *                 extractedText:
 *                   type: string
 *                 translatedText:
 *                   type: string
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Failed to process receipt
 */
router.post('/process-receipt', upload.single('receipt'), processReceipt);

export default router;
