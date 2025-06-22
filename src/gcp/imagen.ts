import { getAccessToken } from './credentials';
import { GCP } from './env';
import type {
  GenerateImageOptions,
  ImagenRequestInstance,
  ImagenRequestParameters,
} from './types';

const domain = `https://${GCP.location}-aiplatform.googleapis.com`;
const path = `v1/projects/${GCP.projectId}/locations/${GCP.location}/publishers/google/models/${GCP.models.image}:predict`;
const endpoint = new URL(path, domain);

export const generateImage = async (options: GenerateImageOptions) => {
  const {
    prompt,
    aspectRatio,
    personGeneration,
    promptRewriting,
    negativePrompt,
    userId,
    requestId,
  } = options;

  const instance: ImagenRequestInstance = {
    prompt,
  };

  const parameters: ImagenRequestParameters = {
    sampleCount: 1,
    aspectRatio: aspectRatio,
    personGeneration: personGeneration,
    enhancePrompt: promptRewriting,
    negativePrompt: negativePrompt,
    storageUri: `gs://${GCP.storageBucket}/imagen/${userId}/${requestId}/`,
    addWatermark: true,
  };

  const accessToken = await getAccessToken();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instances: [instance],
      parameters,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error from Imagen API:', JSON.stringify(error, null, 2));
    throw new Error(`Imagen API request failed with status ${response.status}`);
  }

  return response.json();
};
