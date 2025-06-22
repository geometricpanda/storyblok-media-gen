import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { GCP_CREDENTIALS } from './credentials';
import { GCP } from './env';

export const getVertexAIClient = () => {
  return new PredictionServiceClient({
    ...GCP_CREDENTIALS,
    apiEndpoint: `${GCP.location}-aiplatform.googleapis.com`,
  });
};
