"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = void 0;
const firestore_1 = require("@google-cloud/firestore");
exports.firestore = new firestore_1.Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: (_a = process.env.GCLOUD_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
    },
});
