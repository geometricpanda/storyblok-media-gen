import { useId } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  minRows?: number;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Textarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  register,
  errors,
  minRows = 3,
  required,
  size,
}: TextareaProps<T>) => {
  const error = errors[name];
  const id = useId();

  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        <span className="label-text text-base-content pb-1 font-bold">
          {label}
          {required && <span className="text-error">*</span>}
        </span>
      </label>
      {description && (
        <p className="text-base-content/80 mb-2 text-xs">{description}</p>
      )}
      <TextareaAutosize
        id={id}
        className={clsx(
          'textarea',
          'textarea-bordered',
          {
            'textarea-sm': size === 'sm',
            'textarea-md': size === 'md',
            'textarea-lg': size === 'lg',
          },
          'leading-tight',
          'focus:ring-2',
          'focus:ring-blue-500',
          'focus:ring-offset-2',
          'focus:outline-none',
          error && 'textarea-error'
        )}
        minRows={minRows}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && (
        <div className="label-text-alt text-error mt-1 flex items-center gap-1 text-xs">
          <AlertTriangle className="h-4 w-4" />
          {error.message?.toString()}
        </div>
      )}
    </div>
  );
};
