"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datastore = void 0;
const datastore_1 = require("@google-cloud/datastore");
const datastore = new datastore_1.Datastore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
exports.datastore = datastore;
