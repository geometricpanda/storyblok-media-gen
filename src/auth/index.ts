import NextAuth from 'next-auth';
import { withCookies } from './cookies';
import { StoryblokProvider } from './storyblok-provider';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [StoryblokProvider()],
  cookies: withCookies({}),
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token!;
        token.refreshToken = account.refresh_token!;
        token.expiresAt = account.expires_at!;
      }

      if (profile) {
        token.user = profile.user;
        token.space = profile.space;
        token.roles = profile.roles;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      session.accessToken = token.accessToken;
      session.space = token.space;
      session.roles = token.roles;
      return session;
    },
  },
});
