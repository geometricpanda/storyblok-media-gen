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

type GetImageRequestByIdData = {
  id: string;
  userId: string | number;
};

export type GeneratedImage = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<Awaited<ReturnType<typeof getImageRequestById>>>
    >['generatedImages']
  >[number]
>;

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
