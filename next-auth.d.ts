export interface StoryblokUser {
  id: string;
  friendly_name: string;
}

export interface StoryblokSpace {
  id: number;
  name: string;
}

export interface StoryblokRole {
  name: string;
}

declare module 'next-auth' {
  interface Profile {
    user: StoryblokUser;
    space: StoryblokSpace;
    roles: StoryblokRole[];
  }

  interface Session {
    user: StoryblokUser;
    accessToken: string;
    space: StoryblokSpace;
    roles: StoryblokRole[];
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: StoryblokUser;
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    space: StoryblokSpace;
    roles: StoryblokRole[];
  }
}
