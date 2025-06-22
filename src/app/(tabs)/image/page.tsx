import { type FC } from 'react';
import { auth } from '@/auth';
import { withAuth } from '@/utils/auth-hoc';
import { ImageForm } from './_components/image-form';

const Page: FC = async () => {
  const session = await auth();

  return (
    <main className="w-full max-w-lg">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <ImageForm />
    </main>
  );
};

export default withAuth(Page);
