'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/button';
import { FileInput } from '@/components/file-input';
import { Select } from '@/components/select';
import { Textarea } from '@/components/textarea';
import { Toggle } from '@/components/toggle';

const playTimeOptions = Array.from({ length: 4 }, (_, i) => {
  const value = i + 5;
  return {
    label: `${value} seconds`,
    value: value.toString(),
  };
});

const personGenerationOptions = [
  { label: 'Allow All', value: 'allow_all' },
  { label: 'Allow Adults', value: 'allow_adults' },
  { label: 'Dont Allow', value: 'disallow' },
];

const aspectRatioOptions = [
  { label: '16:9', value: '16:9' },
  { label: '9:16', value: '9:16' },
];

const videoFormSchema = z.object({
  prompt: z.string().min(1, 'Please enter a prompt'),
  negativePrompt: z.string().optional(),
  playTime: z.coerce.number().min(5).max(8),
  promptRewriting: z.boolean(),
  startingImage: z.instanceof(FileList).optional(),
  personGeneration: z.enum(['allow_all', 'allow_adults', 'disallow']),
  aspectRatio: z.enum(['16:9', '9:16']),
});

type VideoFormSchema = z.infer<typeof videoFormSchema>;

export const VideoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VideoFormSchema>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      playTime: 5,
      promptRewriting: true,
      personGeneration: 'allow_adults',
      aspectRatio: '16:9',
    },
  });

  const onSubmit: SubmitHandler<VideoFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea<VideoFormSchema>
        name="prompt"
        label="Prompt"
        description="Describe the video you want to generate."
        register={register}
        errors={errors}
        placeholder="A high-speed chase through a neon-lit cyberpunk city at night, with rain-slicked streets reflecting the glowing advertisements."
        required
      />
      <div className="mt-4">
        <FileInput<VideoFormSchema>
          name="startingImage"
          label="Starting Image"
          description="16:9 works best"
          register={register}
          errors={errors}
          accept="image/jpeg"
        />
      </div>
      <div className="mt-4">
        <Textarea<VideoFormSchema>
          name="negativePrompt"
          label="Negative Prompt"
          description="Describe what you don't want to see in the video."
          register={register}
          errors={errors}
          placeholder="low quality, blurry, cartoonish"
          minRows={2}
        />
      </div>
      <div className="mt-4">
        <Select<VideoFormSchema>
          name="personGeneration"
          label="Person Generation"
          description="Control how people are represented in the generated video."
          register={register}
          errors={errors}
          options={personGenerationOptions}
        />
      </div>
      <div className="mt-4">
        <Select<VideoFormSchema>
          name="aspectRatio"
          label="Aspect Ratio"
          description="The dimensions of the generated video."
          register={register}
          errors={errors}
          options={aspectRatioOptions}
        />
      </div>
      <div className="mt-4">
        <Select<VideoFormSchema>
          name="playTime"
          label="Play Time"
          description="The duration of the generated video."
          register={register}
          errors={errors}
          options={playTimeOptions}
        />
      </div>
      <div className="mt-4">
        <Toggle<VideoFormSchema>
          name="promptRewriting"
          label="Prompt Rewriting"
          description="Let an AI rewrite your prompt for better results."
          register={register}
          watch={watch}
          errors={errors}
        />
      </div>
      <p className="text-base-content/70 mt-4 text-center text-xs">
        All videos are generated at 720p and 24fps.
      </p>
      <div className="form-control mt-6">
        <Button type="submit">Generate Video</Button>
      </div>
      <p className="text-base-content/70 mt-4 text-center text-xs">
        To promote transparency, all generated videos will include a subtle
        watermark identifying them as AI-created.
      </p>
    </form>
  );
};
