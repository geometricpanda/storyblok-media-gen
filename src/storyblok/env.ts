import 'server-only';
import z from 'zod';

const storyblokEnvSchema = z.object({
  STORYBLOK_PAT: z.string().nonempty(),
  STORYBLOK_TOOL_NAME: z.string().nonempty(),
});

const { STORYBLOK_PAT, STORYBLOK_TOOL_NAME } = storyblokEnvSchema.parse(
  process.env
);

console.log(STORYBLOK_PAT, STORYBLOK_TOOL_NAME);

export const STORYBLOK = {
  PAT: STORYBLOK_PAT,
  TOOL_NAME: STORYBLOK_TOOL_NAME,
};
