import { type NextAuthConfig } from 'next-auth';

export interface CookiesProps {
  path?: string;
  sameSite?: 'lax' | 'strict' | 'none' | boolean;
  secure?: boolean;
  httpOnly?: boolean;
}

export type WithCookies = (props: CookiesProps) => NextAuthConfig['cookies'];

export const withCookies: WithCookies = ({
  sameSite = 'none',
  secure = true,
  httpOnly = true,
  path = '/',
}) => ({
  sessionToken: {
    name: `__Secure-next-auth.session-token`,
    options: {
      httpOnly,
      path,
      secure,
      sameSite,
    },
  },
  callbackUrl: {
    name: `__Secure-next-auth.callback-url`,
    options: {
      httpOnly,
      path,
      secure,
      sameSite,
    },
  },
  csrfToken: {
    name: `__Host-next-auth.csrf-token`,
    options: {
      httpOnly,
      path,
      secure,
      sameSite,
    },
  },
  pkceCodeVerifier: {
    name: `__Host-next-auth.pkce.code_verifier`,
    options: {
      httpOnly,
      path,
      secure,
      sameSite,
      maxAge: 900,
    },
  },
  state: {
    name: `__Host-next-auth.state`,
    options: {
      httpOnly,
      path,
      secure,
      sameSite,
      maxAge: 900,
    },
  },
  nonce: {
    name: `__Host-next-auth.nonce`,
    options: {
      httpOnly,
      path,
      secure,
      sameSite,
    },
  },
});
