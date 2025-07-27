import { TranslationServiceClient } from '@google-cloud/translate';

const translationClient = new TranslationServiceClient();

export const translateText = async (text: string, targetLanguage: string) => {
  const [response] = await translationClient.translateText({
    contents: [text],
    targetLanguageCode: targetLanguage,
    parent: `projects/${process.env.GCLOUD_PROJECT_ID}/locations/global`
  });

  return response.translations?.[0]?.translatedText || text;
};
