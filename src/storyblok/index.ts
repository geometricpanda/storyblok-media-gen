import 'server-only';
import { unauthorized } from 'next/navigation';
import StoryblokClient from 'storyblok-js-client';
import { auth } from '@/auth';
import { STORYBLOK } from './env';

export const getStoryblokClient = async () => {
  const session = await auth();
  if (!session) {
    return unauthorized();
  }

  // TODO: Query with Storyblok why this doesnt work.
  // const oauthToken = `Bearer ${session.accessToken}`;
  return new StoryblokClient({
    oauthToken: STORYBLOK.PAT,
  });
};
