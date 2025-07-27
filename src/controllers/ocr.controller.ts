import { Request, Response } from 'express';
import {
  uploadReceipt,
  extractTextFromImage,
  extractTextFromVideo,
  extractTextFromAudio,
  translateText
} from '../services/ocr.service';
import fs from 'fs';
import path from 'path';

export const processReceipt = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.path;
    const ext = path.extname(file.originalname).toLowerCase();
    let extractedText = '';

    // ✅ Upload to Google Cloud Storage
    const fileUrl = await uploadReceipt(filePath);

    // ✅ Detect file type and extract text
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      extractedText = await extractTextFromImage(filePath);
    } else if (['.mp4', '.mov', '.avi'].includes(ext)) {
      extractedText = await extractTextFromVideo(filePath);
    } else if (['.mp3', '.wav'].includes(ext)) {
      extractedText = await extractTextFromAudio(filePath);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // ✅ Translate text if needed
    const targetLang = req.body.targetLang || 'en';
    const translatedText = await translateText(extractedText || '', targetLang);

    // ✅ Delete local file after processing
    fs.unlinkSync(filePath);

    return res.json({
      success: true,
      fileUrl,
      extractedText,
      translatedText
    });
  } catch (error) {
    console.error('❌ Error in processReceipt:', error);
    return res.status(500).json({ error: 'Failed to process receipt' });
  }
};
