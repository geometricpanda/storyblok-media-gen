import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

type FieldErrors = Record<string, string[] | undefined>;

export type ServerActionErrorResult =
  | {
      error: string;
      fieldErrors?: never;
    }
  | {
      error?: never;
      fieldErrors: FieldErrors;
    };

export const handleServerActionErrors = <T extends FieldValues>(
  result: ServerActionErrorResult,
  setError: UseFormSetError<T>
) => {
  if (result.fieldErrors) {
    for (const [field, messages] of Object.entries(result.fieldErrors)) {
      if (messages) {
        setError(field as Path<T>, {
          type: 'server',
          message: messages.join(', '),
        });
      }
    }
  } else if (result.error) {
    setError('root.serverError', {
      type: 'server',
      message: result.error,
    });
  }
};
