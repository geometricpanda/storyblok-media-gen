import Link from 'next/link';
import { FC } from 'react';
import { Camera } from 'lucide-react';
import { generateImageToken } from '@/auth/image-token';
import SecureImage from '@/components/secure-image';
import { ImagenAspectRatio } from '@/gcp/types';
import { getDimensionsFromRatio } from '@/utils/image-helpers';

interface HistoryImagePreviewProps {
  image: {
    id: string;
    gcsUri: string;
    prompt: string;
    requestId: string;
    aspectRatio: string;
  };
  userId: string;
}

const HistoryImagePreview: FC<HistoryImagePreviewProps> = ({
  image,
  userId,
}) => {
  const token = generateImageToken({
    gcsUri: image.gcsUri,
    userId,
  });

  const { width, height } = getDimensionsFromRatio(
    image.aspectRatio as ImagenAspectRatio
  );

  const aspectRatio = width / height;

  return (
    <Link
      href={`/image/view/${image.requestId}`}
      className="group relative flex rounded-md bg-black/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      style={{ aspectRatio }}
    >
      <SecureImage
        alt={image.prompt}
        src={`/api/image/${token}`}
        width={width}
        height={height}
        className="rounded-md"
      />
      <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <Camera className="text-white" size={32} />
      </div>
    </Link>
  );
};

export default HistoryImagePreview;
