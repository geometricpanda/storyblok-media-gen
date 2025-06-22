import z from 'zod';

const gcpSchema = z.object({
  GCP_LOCATION: z.string(),
  GCP_PROJECT_ID: z.string(),
  GCP_MODEL_IMAGES: z.string(),
  GCP_MODEL_VIDEO: z.string().default(''),
  GCP_STORAGE_BUCKET: z.string().min(1, 'Missing GCP_STORAGE_BUCKET'),
});

const {
  GCP_LOCATION,
  GCP_PROJECT_ID,
  GCP_MODEL_IMAGES,
  GCP_MODEL_VIDEO,
  GCP_STORAGE_BUCKET,
} = gcpSchema.parse(process.env);

export const GCP = {
  projectId: GCP_PROJECT_ID,
  location: GCP_LOCATION,
  models: {
    image: GCP_MODEL_IMAGES,
    video: GCP_MODEL_VIDEO,
  },
  storageBucket: GCP_STORAGE_BUCKET,
};
