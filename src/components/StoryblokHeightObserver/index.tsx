'use client';

import { type FC, type ReactNode, useEffect } from 'react';
import useMeasure from 'react-use-measure';

interface StoryblokHeightObserverProps {
  children: ReactNode;
  tool: string;
}

export const StoryblokHeightObserver: FC<StoryblokHeightObserverProps> = ({
  children,
  tool,
}) => {
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    window.parent.postMessage(
      {
        action: 'tool-changed',
        event: 'heightChange',
        tool,
        height,
      },
      '*'
    );
  }, [height, tool]);

  return <div ref={ref}>{children}</div>;
};
