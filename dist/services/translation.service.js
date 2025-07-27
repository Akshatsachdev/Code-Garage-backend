"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = void 0;
const translate_1 = require("@google-cloud/translate");
const translationClient = new translate_1.TranslationServiceClient();
const translateText = async (text, targetLanguage) => {
    var _a, _b;
    const [response] = await translationClient.translateText({
        contents: [text],
        targetLanguageCode: targetLanguage,
        parent: `projects/${process.env.GCLOUD_PROJECT_ID}/locations/global`
    });
    return ((_b = (_a = response.translations) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.translatedText) || text;
};
exports.translateText = translateText;
