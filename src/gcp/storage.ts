import 'server-only';
import { Storage } from '@google-cloud/storage';
import { getCredentials } from './credentials';
import { GCP } from './env';

const getStorageClient = async () => {
  const credentials = await getCredentials();

  return new Storage({
    projectId: GCP.projectId,
    credentials,
  });
};

export const getSignedUrl = async (gcsUrl: string): Promise<string> => {
  if (!gcsUrl.startsWith('gs://')) {
    throw new Error('Invalid GCS URL');
  }

  const storage = await getStorageClient();
  const [bucketName, ...filePathParts] = gcsUrl.replace('gs://', '').split('/');
  const fileName = filePathParts.join('/');

  const [signedUrl] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

  return signedUrl;
};

export const getStorageImageAsBase64 = async (
  gcsUrl: string
): Promise<string> => {
  if (!gcsUrl.startsWith('gs://')) {
    throw new Error('Invalid GCS URL');
  }

  const storage = await getStorageClient();
  const [bucketName, ...filePathParts] = gcsUrl.replace('gs://', '').split('/');
  const fileName = filePathParts.join('/');

  const fileContents = await storage
    .bucket(bucketName)
    .file(fileName)
    .download();

  const base64 = fileContents[0].toString('base64');
  const { contentType } = await storage
    .bucket(bucketName)
    .file(fileName)
    .getMetadata()
    .then(([metadata]) => ({
      contentType: metadata.contentType || 'image/png',
    }));

  return `data:${contentType};base64,${base64}`;
};

export const getStorageImageBlob = async (gcsUrl: string): Promise<Blob> => {
  if (!gcsUrl.startsWith('gs://')) {
    throw new Error('Invalid GCS URL');
  }

  const storage = await getStorageClient();
  const [bucketName, ...filePathParts] = gcsUrl.replace('gs://', '').split('/');
  const fileName = filePathParts.join('/');

  const [fileContents] = await storage
    .bucket(bucketName)
    .file(fileName)
    .download();

  const { contentType } = await storage
    .bucket(bucketName)
    .file(fileName)
    .getMetadata()
    .then(([metadata]) => ({
      contentType: metadata.contentType || 'image/jpeg',
    }));

  return new Blob([fileContents], { type: contentType });
};
