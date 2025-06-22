import { z } from 'zod';
import { ImagenAspectRatio, PersonGeneration } from '@/gcp/types';

export const imageFormSchema = z.object({
  prompt: z.string().min(1, 'Please enter a prompt'),
  aspectRatio: z.nativeEnum(ImagenAspectRatio),
  promptRewriting: z.boolean(),
  personGeneration: z.nativeEnum(PersonGeneration),
  negativePrompt: z.string().optional(),
});

export type ImageFormSchema = z.infer<typeof imageFormSchema>;
