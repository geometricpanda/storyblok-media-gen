import Link from 'next/link';
import { type FC, type ReactNode } from 'react';
import clsx from 'clsx';
import { Camera, Video } from 'lucide-react';
import { withAuth } from '@/utils/auth-hoc';

interface TabsLayoutProps {
  children: ReactNode;
}

const TabsLayout: FC<TabsLayoutProps> = ({ children }) => {
  return (
    <>
      <div role="tablist" className="tabs tabs-border -ml-2">
        <Link
          href="/image"
          role="tab"
          className={clsx('tab', 'tab-active', 'font-bold', 'flex', 'gap-2')}
        >
          <Camera />
          AI Image
        </Link>

        <Link href="/video" role="tab" className={clsx('tab', 'flex', 'gap-2')}>
          <Video />
          AI Video
        </Link>
      </div>

      <div className="mt-4">{children}</div>
    </>
  );
};

export default withAuth(TabsLayout);
