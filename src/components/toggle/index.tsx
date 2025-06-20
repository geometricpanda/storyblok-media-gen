import { useId } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
  type UseFormWatch,
} from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';

interface ToggleProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
}

export const Toggle = <T extends FieldValues>({
  name,
  label,
  description,
  register,
  watch,
  errors,
}: ToggleProps<T>) => {
  const id = useId();
  const error = errors[name];
  const isEnabled = watch(name);

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
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          className="toggle toggle-primary toggle-lg"
          {...register(name)}
        />
        <label
          htmlFor={id}
          className="text-base-content cursor-pointer text-sm font-bold"
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </label>
      </div>
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
