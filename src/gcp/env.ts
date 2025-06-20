import z from 'zod';

const gcpSchema = z.object({
  GCP_LOCATION: z.string(),
  GCP_PROJECT_ID: z.string(),
});

const { GCP_LOCATION, GCP_PROJECT_ID } = gcpSchema.parse(process.env);

export const GCP = {
  projectId: GCP_PROJECT_ID,
  location: GCP_LOCATION,
};
