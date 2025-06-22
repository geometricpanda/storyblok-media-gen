import { notFound } from 'next/navigation';
import {
  GeneratedImage,
  getImageRequestById,
} from '@/database/queries/image-request';
import { withAuth } from '@/utils/auth-hoc';

type PageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

const Page = withAuth<PageProps>(async (props, session) => {
  const { requestId } = await props.params;

  const imageRequest = await getImageRequestById({
    id: requestId,
    userId: session.user.id,
  });

  if (!imageRequest) {
    notFound();
  }

  const { prompt, negativePrompt, generatedImages } = imageRequest;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Image Request</h1>
      <p>
        <span className="font-semibold">Prompt:</span> {prompt}
      </p>
      {imageRequest.negativePrompt && (
        <p>
          <span className="font-semibold">Negative Prompt:</span>{' '}
          {negativePrompt}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {generatedImages.map((image: GeneratedImage) => (
          <div key={image.id} className="rounded-lg border">
            {/* We need to get a signed URL to display the image from GCS */}
            <div className="bg-base-200 h-64 w-full">
              <p className="p-4 text-xs">{image.gcsUri}</p>
            </div>
            <div className="p-4">
              <p className="text-xs">{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Page;
