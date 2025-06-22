import 'server-only';
import { GoogleAuth } from 'google-auth-library';

// Intentionally not validating credentials here
// as local development uses GCLOUD CLI to authenticate

const { GCP_PRIVATE_KEY, GCP_SERVICE_ACCOUNT_EMAIL, GCP_PROJECT_ID } =
  process.env;

const _credentials = {
  projectId: GCP_PROJECT_ID,
  credentials: {
    client_email: GCP_SERVICE_ACCOUNT_EMAIL,
    private_key: GCP_PRIVATE_KEY,
  },
};

export const GCP_CREDENTIALS = GCP_PRIVATE_KEY ? _credentials : {};

export const getAccessToken = async () => {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    ...GCP_CREDENTIALS,
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  if (!accessToken.token) {
    throw new Error('Could not get access token');
  }

  return accessToken.token;
};
