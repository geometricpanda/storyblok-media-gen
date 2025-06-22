import Link from 'next/link';
import { type FC, type ReactNode } from 'react';
import clsx from 'clsx';

interface TabProps {
  href: string;
  icon: ReactNode;
  text: string;
  active?: boolean;
}

export const Tab: FC<TabProps> = ({ href, icon, text, active }) => {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex',
        'items-center',
        'gap-2',
        'px-2.5',
        'py-3',
        'border-b-2',
        'font-medium',
        'text-sm',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-blue-500',
        {
          'border-blue-500': active,
          'text-blue-600': active,
          'border-transparent': !active,
          'text-gray-500': !active,
          'hover:text-gray-700': !active,
          'hover:border-gray-300': !active,
        }
      )}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};
