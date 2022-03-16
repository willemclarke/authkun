import { NextFunction, Request, Response } from 'express';
import { AuthkunError, AuthkunErrors, errorTypeToStatusCode } from '../AuthkunError';

export const isAuthkunError = (error: Error | AuthkunError) => error instanceof AuthkunError;

export const errorMiddleware = (
  error: Error | AuthkunError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isAuthkunError(error)) {
    error = new AuthkunError({
      type: AuthkunErrors.InternalServerError,
      message: error.message,
    });
  }

  const status = errorTypeToStatusCode((error as AuthkunError).type);
  res.status(status).json(error as AuthkunError);
};
