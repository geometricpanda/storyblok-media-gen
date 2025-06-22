'use server';

import 'server-only';
import { ImageRequestStatus } from '@prisma/client';
import { imageFormSchema } from '@/app/(tabs)/image/_lib/schema';
import { createGeneratedImages } from '@/database/queries/generated-image';
import {
  createImageRequest,
  updateImageRequestStatus,
} from '@/database/queries/image-request';
import { generateImage } from '@/gcp/imagen';
import type { ImagenResponse } from '@/gcp/types';
import type { ServerActionErrorResult } from '@/utils/form-helpers';
import { withServerAction } from '@/utils/server-action-hof';

type SuccessState = {
  id: string;
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

  try {
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

    await updateImageRequestStatus({
      id: imageRequest.id,
      status: ImageRequestStatus.SUCCESS,
    });

    return { id: imageRequest.id };
  } catch {
    await updateImageRequestStatus({
      id: imageRequest.id,
      status: ImageRequestStatus.FAILED,
    });

    return {
      error: 'There was an error generating the image. Please try again later.',
    };
  }
});
