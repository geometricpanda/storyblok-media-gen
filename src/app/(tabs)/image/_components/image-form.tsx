'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@/components/alert';
import { Button } from '@/components/button';
import { Select } from '@/components/select';
import { Textarea } from '@/components/textarea';
import { Toggle } from '@/components/toggle';
import { ImagenAspectRatio, PersonGeneration } from '@/gcp/types';
import { handleServerActionErrors } from '@/utils/form-helpers';
import { generateImageAction } from '../_actions/generate-image';
import { ImageFormSchema, imageFormSchema } from '../_lib/schema';

const aspectRatios = [
  { label: '1:1 (Square)', value: ImagenAspectRatio.SQUARE },
  { label: '3:4 (Portrait)', value: ImagenAspectRatio.ADS },
  { label: '4:3 (Landscape)', value: ImagenAspectRatio.TV },
  { label: '9:16 (Portrait)', value: ImagenAspectRatio.PORTRAIT },
  { label: '16:9 (Landscape)', value: ImagenAspectRatio.LANDSCAPE },
];

const personGenerationOptions = [
  { label: 'Allow Adults', value: PersonGeneration.ALLOW_ADULT },
  { label: 'Dont Allow', value: PersonGeneration.DONT_ALLOW },
];

export const ImageForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
  } = useForm<ImageFormSchema>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      aspectRatio: ImagenAspectRatio.LANDSCAPE,
      promptRewriting: true,
      personGeneration: PersonGeneration.ALLOW_ADULT,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();
    const result = await generateImageAction(data);

    if (result && 'imageRequestId' in result) {
      router.push(`/image/${result.imageRequestId}`);
    } else if (result && ('error' in result || 'fieldErrors' in result)) {
      handleServerActionErrors(result, setError);
    }
  });

  const errorMessages = Object.values(errors)
    .map((error) => error?.message)
    .filter(Boolean);

  return (
    <form onSubmit={onSubmit}>
      {errorMessages.length > 0 && (
        <Alert
          type="error"
          className="mb-4"
          title={`You have ${errorMessages.length} error${
            errorMessages.length > 1 ? 's' : ''
          }`}
        >
          <ul className="list-inside list-disc">
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Textarea<ImageFormSchema>
        name="prompt"
        label="Prompt"
        description="Describe the image you want to generate."
        register={register}
        errors={errors}
        placeholder="A majestic lion with a flowing mane, standing on a rocky outcrop overlooking a vast savanna at sunset, cinematic lighting, hyper-detailed, shot on a DSLR with a 50mm lens during the golden hour."
        required
      />
      <div className="mt-4">
        <Textarea<ImageFormSchema>
          name="negativePrompt"
          label="Negative Prompt"
          description="Describe what you want to avoid in the generated image."
          register={register}
          errors={errors}
          placeholder="text, watermark, bad quality, poor quality, blurry, pixelated, noisy"
        />
      </div>
      <div className="mt-4">
        <Select<ImageFormSchema>
          name="aspectRatio"
          label="Aspect Ratio"
          description="The dimensions of the generated image."
          register={register}
          errors={errors}
          options={aspectRatios}
        />
      </div>
      <div className="mt-4">
        <Select<ImageFormSchema>
          name="personGeneration"
          label="Person Generation"
          description="Control how people are represented in the generated image."
          register={register}
          errors={errors}
          options={personGenerationOptions}
        />
      </div>
      <div className="mt-4">
        <Toggle
          name="promptRewriting"
          label="Prompt Rewriting"
          description="Let an AI rewrite your prompt for better results."
          register={register}
          watch={watch}
          errors={errors}
        />
      </div>
      <div className="form-control mt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Generating...' : 'Generate Image'}
        </Button>
      </div>
      <p className="text-base-content/70 mt-4 text-center text-xs">
        To promote transparency, all generated images will include a subtle
        watermark identifying them as AI-created.
      </p>
    </form>
  );
};
