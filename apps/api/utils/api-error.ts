import { z, ZodError } from 'zod';

export function errorBody(message: string) {
  return { error: { message } };
}

export function validationErrorBody(zodError: ZodError) {
  const { fieldErrors, formErrors } = z.flattenError(zodError);
  const message = formErrors[0] ?? 'Validation failed.';

  return Object.keys(fieldErrors).length > 0
    ? { error: { message, fieldErrors } }
    : { error: { message } };
}
