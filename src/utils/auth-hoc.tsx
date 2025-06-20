import { unauthorized } from 'next/navigation';
import { ComponentType, FC } from 'react';

import { auth } from '@/auth';

export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const WithAuth: FC<P> = async (props) => {
    const session = await auth();

    if (!session) {
      unauthorized();
    }

    return <WrappedComponent {...props} session={session} />;
  };

  return WithAuth;
};
