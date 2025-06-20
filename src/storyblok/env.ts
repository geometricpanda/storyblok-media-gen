import z from 'zod';

const storyblokEnvSchema = z.object({
  STORYBLOK_TOOL_NAME: z.string().nonempty(),
});

const { STORYBLOK_TOOL_NAME } = storyblokEnvSchema.parse(process.env);

export const STORYBLOK = { TOOL_NAME: STORYBLOK_TOOL_NAME };
