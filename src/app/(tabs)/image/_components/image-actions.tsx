'use client';

import { type FC, useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/button';
import {
  type GeneratedImage,
  type ImageRequest,
} from '@/database/queries/image-request';
import { importToStoryblokAction } from '../_actions/import-to-storyblok';

interface ImageActionsProps {
  imageRequest: ImageRequest;
  generatedImage: GeneratedImage;
}

export const ImageActions: FC<ImageActionsProps> = ({
  imageRequest,
  generatedImage,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isImported, setIsImported] = useState(
    !!generatedImage.importedToStoryblokAt
  );

  const handleImport = () => {
    startTransition(async () => {
      await importToStoryblokAction({
        generatedImageId: generatedImage.id,
        originalPrompt: imageRequest.prompt,
        rewrittenPrompt: generatedImage.prompt,
      });
      setIsImported(true);
    });
  };

  if (isImported) {
    return (
      <Button disabled fullWidth>
        Imported to Storyblok
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button disabled outline fullWidth>
        Importing
      </Button>
    );
  }

  return (
    <form action={handleImport}>
      <Button
        type="submit"
        icon={<Sparkles size={20} />}
        variant="primary"
        outline
        fullWidth
      >
        Import to Storyblok
      </Button>
    </form>
  );
};
