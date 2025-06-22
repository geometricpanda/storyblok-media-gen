import { FC } from 'react';
import { auth } from '@/auth';
import { getImageRequestsByUserId } from '@/database/queries/image-request';
import HistoryImagePreview from './_components/history-image-preview';

const Page: FC = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const imageRequests = await getImageRequestsByUserId({
    userId,
  });

  const allGeneratedImages = imageRequests.flatMap((request) =>
    request.generatedImages.map((image) => ({
      ...image,
      requestId: request.id,
      prompt: request.prompt,
      aspectRatio: request.aspectRatio,
    }))
  );

  return (
    <div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {allGeneratedImages.map((image) => (
          <HistoryImagePreview key={image.id} image={image} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Page;
