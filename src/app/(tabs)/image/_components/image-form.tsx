'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
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

interface ImageFormProps {
  imageRequest?: ImageFormSchema;
}

export const ImageForm: React.FC<ImageFormProps> = ({ imageRequest }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
  } = useForm<ImageFormSchema>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: imageRequest || {
      aspectRatio: ImagenAspectRatio.LANDSCAPE,
      promptRewriting: true,
      personGeneration: PersonGeneration.ALLOW_ADULT,
    },
  });

  const prompt = watch('prompt');
  const promptWordCount = prompt ? prompt.trim().split(/\s+/).length : 0;
  const isPromptTooLong = promptWordCount > 30;

  useEffect(() => {
    if (isPromptTooLong) {
      setValue('promptRewriting', false);
    }
  }, [isPromptTooLong, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const result = await generateImageAction(data);

    if (result && ('error' in result || 'fieldErrors' in result)) {
      return handleServerActionErrors(result, setError);
    }

    router.push(`/image/view/${result.id}`);
  });

  return (
    <form onSubmit={onSubmit}>
      {errors.root?.serverError && (
        <Alert type="error" className="mb-4" title="An error occurred">
          {errors.root.serverError.message}
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
        size="sm"
      />
      <div className="mt-4">
        <Textarea<ImageFormSchema>
          name="negativePrompt"
          label="Negative Prompt"
          description="Describe what you want to avoid in the generated image."
          register={register}
          errors={errors}
          placeholder="text, watermark, bad quality, poor quality, blurry, pixelated, noisy"
          size="sm"
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
          size="sm"
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
          size="sm"
        />
      </div>
      <div className="mt-4">
        <Toggle
          name="promptRewriting"
          label="Prompt Rewriting"
          description={
            isPromptTooLong
              ? 'Disabled because prompt is over 30 words.'
              : 'Let an AI rewrite your prompt for better results.'
          }
          register={register}
          watch={watch}
          errors={errors}
          disabled={isPromptTooLong}
        />
      </div>
      <div className="form-control mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          icon={<Sparkles size={20} />}
          variant="primary"
          fullWidth
        >
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
