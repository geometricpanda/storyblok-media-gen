'use server';

import { createGeneratedImages } from '@/database/queries/generated-image';
import { createImageRequest } from '@/database/queries/image-request';
import { generateImage } from '@/gcp/imagen';
import type { ImagenResponse } from '@/gcp/types';
import { ServerActionErrorResult } from '@/utils/form-helpers';
import { withServerAction } from '@/utils/server-action-hof';
import { imageFormSchema } from '../_lib/schema';

type SuccessState = {
  imageRequestId: string;
};

export type GenerateImageActionState = SuccessState | ServerActionErrorResult;

export const generateImageAction = withServerAction<
  typeof imageFormSchema,
  SuccessState
>(imageFormSchema, async (data, session) => {
  const imageRequest = await createImageRequest({
    data,
    userId: session.user.id,
  });
  const response = (await generateImage({
    ...data,
    userId: session.user.id,
    requestId: imageRequest.id,
  })) as ImagenResponse;

  if (response.predictions && response.predictions.length > 0) {
    await createGeneratedImages({
      predictions: response.predictions,
      imageRequestId: imageRequest.id,
    });
  }

  return {
    imageRequestId: imageRequest.id,
  };
});
