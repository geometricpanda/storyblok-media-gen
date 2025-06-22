import { notFound } from 'next/navigation';
import { getImageRequestById } from '@/database/queries/image-request';
import { withAuth } from '@/utils/auth-hoc';
import { ImageForm } from '../../_components/image-form';
import { mapImageRequestToForm } from '../../_lib/mappers';

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

  const imageRequestForForm = mapImageRequestToForm(imageRequest);

  return (
    <main className="w-full max-w-lg">
      <ImageForm imageRequest={imageRequestForForm} />
    </main>
  );
});

export default Page;
