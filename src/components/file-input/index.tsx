import { useId } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';

interface FileInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  accept?: string;
  required?: boolean;
}

export const FileInput = <T extends FieldValues>({
  name,
  label,
  description,
  register,
  errors,
  accept,
  required,
}: FileInputProps<T>) => {
  const id = useId();
  const error = errors[name];

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
      <input
        {...register(name)}
        id={id}
        type="file"
        accept={accept}
        className={clsx(
          'file-input',
          'file-input-bordered',
          'w-full',
          'focus:ring-2',
          'focus:ring-blue-500',
          'focus:ring-offset-2',
          'focus:outline-none',
          { 'file-input-error': !!error }
        )}
      />
      {error && (
        <label className="label mt-1">
          <span className="label-text-alt text-error inline-flex items-center gap-1 text-xs">
            <AlertTriangle className="h-4 w-4" />
            <>{error.message?.toString()}</>
          </span>
        </label>
      )}
    </div>
  );
};
