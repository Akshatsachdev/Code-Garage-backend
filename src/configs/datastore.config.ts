import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export { datastore };
