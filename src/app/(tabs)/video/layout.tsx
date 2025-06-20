import { type FC, type ReactNode } from 'react';
import { Camera, Video } from 'lucide-react';
import { Tab } from '@/components/tab';
import { Tabs } from '@/components/tabs';
import { withAuth } from '@/utils/auth-hoc';

interface TabsLayoutProps {
  children: ReactNode;
}

const TabsLayout: FC<TabsLayoutProps> = ({ children }) => {
  return (
    <>
      <Tabs>
        <Tab href="/image" icon={<Camera />} text="AI Image" />
        <Tab href="/video" icon={<Video />} text="AI Video" active />
      </Tabs>
      <div className="mt-4">{children}</div>
    </>
  );
};

export default withAuth(TabsLayout);
