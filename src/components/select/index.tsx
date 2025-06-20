import { useId } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: { label: string; value: string }[];
}

export const Select = <T extends FieldValues>({
  name,
  label,
  description,
  register,
  errors,
  options,
}: SelectProps<T>) => {
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
      <select
        id={id}
        className={clsx(
          'select',
          'select-bordered',
          'focus:ring-2',
          'focus:ring-blue-500',
          'focus:ring-offset-2',
          'focus:outline-none',
          error && 'select-error'
        )}
        {...register(name)}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
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
