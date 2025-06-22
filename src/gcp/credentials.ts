import 'server-only';
import { GoogleAuth } from 'google-auth-library';

// Intentionally not validating credentials here
// as local development uses GCLOUD CLI to authenticate

const { GCP_CREDENTIALS: b64Credentials, GCP_PROJECT_ID } = process.env;

const getGcpCredentials = () => {
  if (b64Credentials) {
    try {
      const decodedCredentials = Buffer.from(b64Credentials, 'base64').toString(
        'utf-8'
      );
      const credentials = JSON.parse(decodedCredentials);
      return {
        projectId: GCP_PROJECT_ID,
        credentials,
      };
    } catch {
      return {
        projectId: GCP_PROJECT_ID,
      };
    }
  }

  return {};
};

export const createAuthClient = () => {
  const credentials = getGcpCredentials();
  return new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    ...credentials,
  });
};

export const getAccessToken = async () => {
  const auth = createAuthClient();
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  if (!accessToken.token) {
    throw new Error('Could not get access token');
  }

  return accessToken.token;
};
