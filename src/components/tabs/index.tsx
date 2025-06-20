import { type FC, type ReactNode } from 'react';
import clsx from 'clsx';

interface TabsProps {
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ children }) => {
  return <nav className={clsx('flex')}>{children}</nav>;
};
