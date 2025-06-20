import { type OAuthConfig, type OAuthUserConfig } from '@auth/core/providers';

export interface StoryblokProviderProfile {
  user: {
    id: string;
    friendly_name: string;
  };
  space: {
    id: number;
    name: string;
  };
  roles: Array<{ name: string }>;
}

export const StoryblokProvider = (
  options?: OAuthUserConfig<StoryblokProviderProfile>
) => {
  return {
    checks: ['none'],
    id: 'storyblok',
    name: 'Storyblok',
    type: 'oauth',
    userinfo: 'https://app.storyblok.com/oauth/user_info',
    authorization: 'https://app.storyblok.com/oauth/authorize',
    token: 'https://app.storyblok.com/oauth/token',
    style: {
      brandColor: '#42b3b0',
      logo: 'https://www.storyblok.com/_astro/logotype.BIAEafuZ.svg',
    },
    profile: async ({ user }) => {
      return {
        id: user.id.toString(),
        name: user.friendly_name,
      };
    },
    ...options,
  } as OAuthConfig<StoryblokProviderProfile>;
};
