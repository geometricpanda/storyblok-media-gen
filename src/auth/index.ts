import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/database';
import { withCookies } from './cookies';
import { StoryblokProvider } from './storyblok-provider';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [StoryblokProvider()],
  cookies: withCookies({}),
  callbacks: {
    async jwt({ token, account, profile, user }) {
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

      if (user) {
        token.id = user.id;
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
      if (token.id) {
        session.user.id = token.id as string;
      }
      session.accessToken = token.accessToken;
      session.space = token.space;
      session.roles = token.roles;
      return session;
    },
  },
});
