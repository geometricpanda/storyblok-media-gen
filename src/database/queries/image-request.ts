import { ImageRequestStatus } from '@prisma/client';
import type { ImageFormSchema } from '@/app/(tabs)/image/_lib/schema';
import { prisma } from '@/database';

type CreateImageRequestData = {
  data: ImageFormSchema;
  userId: string | number;
};

export const createImageRequest = ({
  data,
  userId,
}: CreateImageRequestData) => {
  return prisma.imageRequest.create({
    data: {
      ...data,
      userId: String(userId),
    },
  });
};

export const updateImageRequestStatus = ({
  id,
  status,
}: {
  id: string;
  status: ImageRequestStatus;
}) => {
  return prisma.imageRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export type ImageRequest = NonNullable<
  Awaited<ReturnType<typeof getImageRequestById>>
>;

type GetImageRequestByIdData = {
  id: string;
  userId: string | number;
};

export type GeneratedImage = ImageRequest['generatedImages'][number];

export const getImageRequestById = ({
  id,
  userId,
}: GetImageRequestByIdData) => {
  return prisma.imageRequest.findUnique({
    where: {
      id,
      userId: String(userId),
    },
    include: {
      generatedImages: true,
    },
  });
};

export const getImageRequestsByUserId = ({
  userId,
}: {
  userId: string | number;
}) => {
  return prisma.imageRequest.findMany({
    where: {
      userId: String(userId),
      status: {
        not: 'FAILED',
      },
    },
    include: {
      generatedImages: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
