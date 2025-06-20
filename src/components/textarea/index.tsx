import { useId } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { AlertTriangle } from 'lucide-react';

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  minRows?: number;
}

export const Textarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  register,
  errors,
  minRows = 3,
}: TextareaProps<T>) => {
  const error = errors[name];
  const id = useId();

  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        <span className="label-text text-base-content pb-1 font-bold">
          {label}
        </span>
      </label>
      {description && (
        <p className="text-base-content/80 mb-2 text-xs">{description}</p>
      )}
      <TextareaAutosize
        id={id}
        {...register(name)}
        placeholder={placeholder}
        className="textarea textarea-bordered"
        minRows={minRows}
      />
      {error && (
        <label className="label mt-1">
          <span className="label-text-alt text-error inline-flex items-center gap-1 text-xs">
            <AlertTriangle className="h-4 w-4" />
            {error.message?.toString()}
          </span>
        </label>
      )}
    </div>
  );
};
