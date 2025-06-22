import 'server-only';
import { GoogleAuth } from 'google-auth-library';

const { GCP_CREDENTIALS, GCP_PROJECT_ID } = process.env;

const getGcpCredentials = () => {
  if (GCP_CREDENTIALS) {
    const decodedCredentials = Buffer.from(
      GCP_CREDENTIALS,
      'base64'
    ).toString();

    if (!decodedCredentials) {
      throw new Error('Could not decode credentials');
    }

    const credentials = JSON.parse(decodedCredentials);

    if (!credentials) {
      throw new Error('Could not parse credentials');
    }
    return {
      projectId: GCP_PROJECT_ID,
      credentials,
    };
  }

  return {};
};

export const createAuth = () => {
  const credentials = getGcpCredentials();
  return new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    ...credentials,
  });
};

export const createAuthClient = async () => {
  const auth = createAuth();
  return await auth.getClient();
};

export const getCredentials = async () => {
  const auth = createAuth();
  return await auth.getCredentials();
};

export const getAccessToken = async () => {
  const client = await createAuthClient();

  if (!client) {
    throw new Error('Could not get Auth Client');
  }

  const accessTokenResponse = await client.getAccessToken();

  if (!accessTokenResponse || !accessTokenResponse.token) {
    console.error('Failed to get access token. Response:', accessTokenResponse);
    throw new Error('Could not get access token');
  }

  return accessTokenResponse.token;
};
