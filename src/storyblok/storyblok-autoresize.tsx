'use client';

import { type FC } from 'react';
import { useAutoHeight } from '@/storyblok/use-auto-height';

interface StoryblokAutoResizeProps {
  tool: string;
}

export const StoryblokAutoResize: FC<StoryblokAutoResizeProps> = ({ tool }) => {
  useAutoHeight({ tool });
  return null;
};
