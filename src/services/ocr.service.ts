import vision from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';
import { v2 as TranslateV2 } from '@google-cloud/translate';
import speech from '@google-cloud/speech';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

// ✅ Initialize clients using service account
const serviceAccountPath = './service-account.json';

const visionClient = new vision.ImageAnnotatorClient({ keyFilename: serviceAccountPath });
const storage = new Storage({ keyFilename: serviceAccountPath });
const translate = new TranslateV2.Translate({ keyFilename: serviceAccountPath });
const speechClient = new speech.SpeechClient({ keyFilename: serviceAccountPath });

const BUCKET_NAME = 'raseed-receipts'; // ✅ Ensure this bucket exists

/**
 * ✅ Upload receipt file to Google Cloud Storage
 */
export const uploadReceipt = async (filePath: string): Promise<string> => {
  try {
    const destination = path.basename(filePath);

    await storage.bucket(BUCKET_NAME).upload(filePath, {
      destination,
      resumable: false,
      gzip: true
    });

    return `https://storage.googleapis.com/${BUCKET_NAME}/${destination}`;
  } catch (error) {
    console.error('❌ Error uploading receipt:', error);
    throw new Error('Failed to upload receipt to GCS');
  }
};

/**
 * ✅ Extract text from image using Google Vision API
 */
export const extractTextFromImage = async (filePath: string): Promise<string> => {
  try {
    const [result] = await visionClient.textDetection(filePath);
    const detections = result.textAnnotations;
    return detections && detections.length > 0 ? (detections[0].description ?? '') : '';
  } catch (error) {
    console.error('❌ Error extracting text from image:', error);
    throw new Error('Failed to extract text from image');
  }
};

/**
 * ✅ Extract text from video (first frame)
 */
export const extractTextFromVideo = async (filePath: string): Promise<string> => {
  try {
    const framePath = `frame_${Date.now()}.jpg`;

    await new Promise<void>((resolve, reject) => {
      exec(`ffmpeg -i ${filePath} -vf "select=eq(n\\,10)" -vframes 1 ${framePath}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const text = await extractTextFromImage(framePath);
    fs.unlinkSync(framePath);
    return text;
  } catch (error) {
    console.error('❌ Error extracting text from video:', error);
    throw new Error('Failed to extract text from video');
  }
};

/**
 * ✅ Extract text from audio using Google Speech-to-Text
 */
export const extractTextFromAudio = async (filePath: string): Promise<string> => {
  try {
    const fileContent = fs.readFileSync(filePath).toString('base64');

    const [response] = await speechClient.recognize({
      audio: { content: fileContent },
      config: {
        encoding: 'LINEAR16',
        languageCode: 'en-US'
      }
    });

    return response.results?.map(r => r.alternatives?.[0]?.transcript).join(' ') || '';
  } catch (error) {
    console.error('❌ Error extracting text from audio:', error);
    throw new Error('Failed to extract text from audio');
  }
};

/**
 * ✅ Translate text using Google Translate API
 */
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    if (!text.trim()) return '';
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('❌ Error translating text:', error);
    throw new Error('Failed to translate text');
  }
};
