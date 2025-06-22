import type { Session } from 'next-auth';
import type { z } from 'zod';
import { auth } from '@/auth';
import type { ServerActionErrorResult } from './form-helpers';

type ActionLogic<T extends z.ZodTypeAny, U> = (
  validatedData: z.infer<T>,
  session: Session
) => Promise<U | ServerActionErrorResult>;

export const withServerAction =
  <T extends z.ZodTypeAny, U>(schema: T, action: ActionLogic<T, U>) =>
  async (data: unknown): Promise<U | ServerActionErrorResult> => {
    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
      return {
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: 'You must be logged in to perform this action.',
      };
    }

    return action(validatedFields.data, session);
  };
