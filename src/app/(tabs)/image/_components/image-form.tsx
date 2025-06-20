'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/button';
import { Select } from '@/components/select';
import { Textarea } from '@/components/textarea';
import { Toggle } from '@/components/toggle';

const aspectRatios = [
  { label: '1:1 (1024x1024)', value: '1024x1024' },
  { label: '3:4 (896x1280)', value: '896x1280' },
  { label: '4:3 (1280x896)', value: '1280x896' },
  { label: '9:16 (768x1408)', value: '768x1408' },
  { label: '16:9 (1408x768)', value: '1408x768' },
];

const personGenerationOptions = [
  { label: 'Allow All', value: 'allow_all' },
  { label: 'Allow Adults', value: 'allow_adults' },
  { label: 'Dont Allow', value: 'disallow' },
];

const imageFormSchema = z.object({
  prompt: z.string().min(1, 'Please enter a prompt'),
  aspectRatio: z.enum([
    '1024x1024',
    '896x1280',
    '1280x896',
    '768x1408',
    '1408x768',
  ]),
  promptRewriting: z.boolean(),
  personGeneration: z.enum(['allow_all', 'allow_adults', 'disallow']),
});

type ImageFormSchema = z.infer<typeof imageFormSchema>;

export const ImageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ImageFormSchema>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      aspectRatio: '1024x1024',
      promptRewriting: true,
      personGeneration: 'allow_adults',
    },
  });

  const onSubmit = (data: ImageFormSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea<ImageFormSchema>
        name="prompt"
        label="Prompt"
        description="Describe the image you want to generate."
        register={register}
        errors={errors}
        placeholder="A majestic lion with a flowing mane, standing on a rocky outcrop overlooking a vast savanna at sunset, cinematic lighting, hyper-detailed, shot on a DSLR with a 50mm lens during the golden hour."
      />
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
        <Button type="submit">Generate Image</Button>
      </div>
      <p className="text-base-content/70 mt-4 text-center text-xs">
        To promote transparency, all generated images will include a subtle
        watermark identifying them as AI-created.
      </p>
    </form>
  );
};
