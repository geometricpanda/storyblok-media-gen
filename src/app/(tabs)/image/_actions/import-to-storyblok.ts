'use server';

import { z } from 'zod';
import { prisma } from '@/database';
import { getGeneratedImageById } from '@/database/queries/generated-image';
import { getStorageImageBlob } from '@/gcp/storage';
import {
  findOrCreateAssetFolder,
  updateAssetMetadata,
  uploadAsset,
} from '@/storyblok/api';
import { STORYBLOK } from '@/storyblok/env';
import { withServerAction } from '@/utils/server-action-hof';

const importToStoryblokSchema = z.object({
  generatedImageId: z.string(),
  originalPrompt: z.string(),
  rewrittenPrompt: z.string().optional(),
});

export const importToStoryblokAction = withServerAction(
  importToStoryblokSchema,
  async ({ generatedImageId, originalPrompt, rewrittenPrompt }, session) => {
    try {
      const image = await getGeneratedImageById(generatedImageId);
      if (!image) {
        return { error: 'Image not found.' };
      }

      const spaceId = session.space.id.toString();
      const userFriendlyName = session.user.friendly_name;

      const folderPath = ['AI Images', userFriendlyName];
      const filename = `${originalPrompt}.jpg`;
      const altText = rewrittenPrompt || originalPrompt;
      const source = `${userFriendlyName} @ ${STORYBLOK.TOOL_NAME}`;

      const assetFolderId = await findOrCreateAssetFolder(spaceId, folderPath);
      if (!assetFolderId) {
        return { error: 'Could not create or find Storyblok asset folder.' };
      }

      const imageBlob = await getStorageImageBlob(image.gcsUri);

      const assetId = await uploadAsset(
        spaceId,
        imageBlob,
        assetFolderId,
        filename
      );

      await updateAssetMetadata(spaceId, assetId, altText, source);

      await prisma.generatedImage.update({
        where: { id: generatedImageId },
        data: { importedToStoryblokAt: new Date() },
      });

      return { success: true, assetId };
    } catch (error) {
      console.error('Failed to import to Storyblok:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      return { error: `Import failed: ${errorMessage}` };
    }
  }
);
