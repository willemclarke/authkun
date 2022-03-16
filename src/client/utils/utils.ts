import { AxiosError } from 'axios';

export interface AuthkunError<T extends Record<string, any>> {
  type: string;
  message: string;
  metadata: { fields: T };
}

export const parseServerFieldErrors = <T>(
  error: AxiosError<AuthkunError<T>>,
  setError: (fieldName: keyof T, error: { type: string; message: string }) => void
): void => {
  const fieldErrors = error.response?.data?.metadata.fields;

  if (!fieldErrors) {
    throw error;
  }

  return Object.keys(fieldErrors).forEach((key) => {
    return setError(key as keyof T, {
      type: 'server',
      message: fieldErrors[key as keyof T] as unknown as string,
    });
  });
};
