import { signIn } from '@/auth';

export const GET = async () => {
  return signIn('storyblok');
};
