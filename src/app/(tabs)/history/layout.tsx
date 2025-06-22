import { type ReactNode } from 'react';
import { Camera, History } from 'lucide-react';
import { Tab } from '@/components/tab';
import { Tabs } from '@/components/tabs';
import { withAuth } from '@/utils/auth-hoc';

interface TabsLayoutProps {
  children: ReactNode;
}

const TabsLayout = withAuth<TabsLayoutProps>(({ children }) => {
  return (
    <>
      <Tabs>
        <Tab href="/image" icon={<Camera />} text="Image" />
        <Tab href="/history" icon={<History />} text="History" active />
      </Tabs>
      <div className="mt-4">{children}</div>
    </>
  );
});

export default TabsLayout;
