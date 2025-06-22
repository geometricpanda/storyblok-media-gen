import StoryblokClient from 'storyblok-js-client';
import { STORYBLOK } from './env';

export const storyblokClient = new StoryblokClient({
  oauthToken: STORYBLOK.PAT,
});

interface StoryblokAssetFolder {
  id: number;
  name: string;
  parent_id: number | null;
}

interface StoryblokPostResponse {
  data: {
    asset_folder: StoryblokAssetFolder;
  };
}

interface StoryblokAssetsResponse {
  data: {
    asset_folders: StoryblokAssetFolder[];
  };
}

interface StoryblokAssetUploadResponse {
  id: number;
  fields: { [key: string]: string };
  post_url: string;
}

const getAssetFolders = async (
  spaceId: string,
  parentId: number = 0
): Promise<StoryblokAssetFolder[]> => {
  const response = await storyblokClient.get(
    `spaces/${spaceId}/asset_folders`,
    {
      with_parent: parentId,
    }
  );
  return (response as unknown as StoryblokAssetsResponse).data.asset_folders;
};

const createAssetFolder = async (
  spaceId: string,
  name: string,
  parent_id: number | null
): Promise<StoryblokAssetFolder> => {
  const payload = {
    asset_folder: { name, parent_id },
  };
  const response = await storyblokClient.post(
    `spaces/${spaceId}/asset_folders`,
    payload as never
  );
  return (response as unknown as StoryblokPostResponse).data.asset_folder;
};

export const findOrCreateAssetFolder = async (
  spaceId: string,
  path: string[],
  parentId: number = 0
): Promise<number> => {
  if (path.length === 0) {
    return parentId;
  }

  const [folderName, ...rest] = path;
  const assetFolders = await getAssetFolders(spaceId, parentId);
  const existingFolder = assetFolders.find(
    (folder) => folder.name === folderName
  );

  if (existingFolder) {
    return findOrCreateAssetFolder(spaceId, rest, existingFolder.id);
  }

  const newFolder = await createAssetFolder(spaceId, folderName, parentId);
  return findOrCreateAssetFolder(spaceId, rest, newFolder.id);
};

export const uploadAsset = async (
  spaceId: string,
  imageBlob: Blob,
  assetFolderId: number,
  filename: string
) => {
  const signedRequestResponse = await storyblokClient.post(
    `spaces/${spaceId}/assets`,
    { filename, asset_folder_id: assetFolderId } as never
  );

  const signedRequest = (
    signedRequestResponse as unknown as { data: StoryblokAssetUploadResponse }
  ).data;

  const formData = new FormData();
  for (const key in signedRequest.fields) {
    formData.append(key, signedRequest.fields[key]);
  }
  formData.append('file', imageBlob, filename);

  const s3Response = await fetch(signedRequest.post_url, {
    method: 'POST',
    body: formData,
  });

  if (!s3Response.ok) {
    throw new Error('Failed to upload image to S3');
  }

  await storyblokClient.get(
    `spaces/${spaceId}/assets/${signedRequest.id}/finish_upload`
  );

  return signedRequest.id;
};

export const updateAssetMetadata = async (
  spaceId: string,
  assetId: number,
  alt: string,
  source: string
) => {
  await storyblokClient.put(`spaces/${spaceId}/assets/${assetId}`, {
    asset: { alt, source },
  } as never);
};
