import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PenSquare } from 'lucide-react';
import { Accordion } from '@/components/accordion';
import { Button } from '@/components/button';
import {
  GeneratedImage,
  getImageRequestById,
} from '@/database/queries/image-request';
import { withAuth } from '@/utils/auth-hoc';
import { ImageActions } from '../../_components/image-actions';
import ImageFromStorage from '../../_components/image-from-storage';

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
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {generatedImages.map((image: GeneratedImage) => (
          <div key={image.id} className="flex flex-col gap-4">
            <ImageFromStorage
              imageRequest={imageRequest}
              generatedImage={image}
              session={session}
            />

            <ImageActions imageRequest={imageRequest} generatedImage={image} />
          </div>
        ))}
      </div>

      <div className="py-2">
        <hr className="border-base-content/10" />
      </div>

      <div className="space-y-2">
        <Accordion title="Prompt">
          <p className="text-sm">{prompt}</p>
        </Accordion>
        {generatedImages.length > 0 && generatedImages[0].prompt && (
          <Accordion title="Rewritten Prompt">
            <p className="text-sm">{generatedImages[0].prompt}</p>
          </Accordion>
        )}
        {negativePrompt && (
          <Accordion title="Negative Prompt">
            <p className="text-sm">{negativePrompt}</p>
          </Accordion>
        )}
      </div>

      <Link href={`/image/edit/${requestId}`} className="block w-full">
        <Button
          variant="secondary"
          outline
          icon={<PenSquare size={20} />}
          fullWidth
        >
          Refine Prompt
        </Button>
      </Link>
    </div>
  );
});

export default Page;
