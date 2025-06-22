import { withAuth } from '@/utils/auth-hoc';
import { ImageForm } from './_components/image-form';

const Page = withAuth(() => {
  return (
    <main className="w-full max-w-lg">
      <ImageForm />
    </main>
  );
});

export default Page;
