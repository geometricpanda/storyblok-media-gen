import type { Session } from 'next-auth';
import { unauthorized } from 'next/navigation';
import { FC } from 'react';
import { auth } from '@/auth';

type AuthenticatedComponent<P> = (
  props: P,
  session: Session
) => React.ReactNode | Promise<React.ReactNode>;

export const withAuth = <P extends object>(
  Component: AuthenticatedComponent<P>
): FC<P> => {
  const WithAuth: FC<P> = async (props) => {
    const session = await auth();
    if (!session) {
      unauthorized();
    }
    return Component(props, session);
  };
  return WithAuth;
};
