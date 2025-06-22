import { Session } from 'next-auth';
import type { FC } from 'react';
import { generateImageToken } from '@/auth/image-token';
import SecureImage from '@/components/secure-image';
import {
  type GeneratedImage,
  type ImageRequest,
} from '@/database/queries/image-request';
import { ImagenAspectRatio } from '@/gcp/types';
import { getDimensionsFromRatio } from '@/utils/image-helpers';

interface ImageFromStorageProps {
  imageRequest: ImageRequest;
  generatedImage: GeneratedImage;
  session: Session;
}

const ImageFromStorage: FC<ImageFromStorageProps> = async ({
  imageRequest,
  generatedImage,
  session,
}) => {
  const token = generateImageToken({
    userId: session.user.id,
    gcsUri: generatedImage.gcsUri,
  });
  const imageUrl = `/api/image/${token}`;
  const { width, height } = getDimensionsFromRatio(
    imageRequest.aspectRatio as ImagenAspectRatio
  );

  return (
    <SecureImage
      alt={imageRequest.prompt}
      height={height}
      src={imageUrl}
      width={width}
      className="rounded-md"
    />
  );
};

export default ImageFromStorage;
