import { prisma } from '@/database';
import type { ImagenPrediction } from '@/gcp/types';

type CreateGeneratedImagesData = {
  predictions: ImagenPrediction[];
  imageRequestId: string;
};

export const createGeneratedImages = ({
  predictions,
  imageRequestId,
}: CreateGeneratedImagesData) => {
  return prisma.generatedImage.createMany({
    data: predictions.map((prediction) => ({
      ...prediction,
      imageRequestId,
    })),
  });
};

export const getGeneratedImageById = (id: string) => {
  return prisma.generatedImage.findUnique({
    where: {
      id,
    },
  });
};
