'use client';

import { type FC, type ReactNode, useId, useState } from 'react';
import clsx from 'clsx';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export const Accordion: FC<AccordionProps> = ({
  title,
  children,
  className,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div
      className={clsx(
        'collapse-arrow bg-base-200 force-no-animation collapse',
        { 'collapse-open': isOpen },
        className
      )}
    >
      <button
        type="button"
        className="collapse-title text-md text-left font-bold"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {title}
      </button>

      <div className="collapse-content force-no-animation" id={contentId}>
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
};
