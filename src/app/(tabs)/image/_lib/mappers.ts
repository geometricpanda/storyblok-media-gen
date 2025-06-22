import { ImageRequest } from '@/database/queries/image-request';
import { ImagenAspectRatio, PersonGeneration } from '@/gcp/types';
import { ImageFormSchema } from './schema';

export const mapImageRequestToForm = (
  imageRequest: ImageRequest
): ImageFormSchema => {
  return {
    ...imageRequest,
    aspectRatio: imageRequest.aspectRatio as ImagenAspectRatio,
    personGeneration: imageRequest.personGeneration as PersonGeneration,
    negativePrompt: imageRequest.negativePrompt || undefined,
  };
};
