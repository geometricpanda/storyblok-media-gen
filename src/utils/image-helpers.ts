import { ImagenAspectRatio } from '@/gcp/types';

const pixelSizes: Record<ImagenAspectRatio, { width: number; height: number }> =
  {
    '1:1': {
      width: 1024,
      height: 1024,
    },
    '3:4': {
      width: 896,
      height: 1280,
    },
    '4:3': {
      width: 1280,
      height: 896,
    },
    '16:9': {
      width: 1408,
      height: 768,
    },
    '9:16': {
      width: 768,
      height: 1408,
    },
  };

export const getDimensionsFromRatio = (aspectRatio: ImagenAspectRatio) => {
  const size = pixelSizes[aspectRatio];

  return {
    width: size.width,
    height: size.height,
  };
};
