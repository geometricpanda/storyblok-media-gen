import 'server-only';
import jwt, { type JwtPayload } from 'jsonwebtoken';

const secret = process.env.AUTH_SECRET;
const expiresIn = 5;

if (!secret) {
  throw new Error('AUTH_SECRET is not set');
}

interface ImageTokenPayload {
  userId: string;
  gcsUri: string;
}

export const generateImageToken = (payload: ImageTokenPayload) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyImageToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret, {
      ignoreExpiration: true,
    }) as ImageTokenPayload & JwtPayload;

    if (typeof decoded.exp === 'undefined') {
      return null;
    }

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};
