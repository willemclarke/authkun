import { NextFunction, Request, Response } from 'express';
import { AuthkunError, AuthkunErrorType, errorTypeToStatusCode } from '../AuthkunError';

const isAuthkunError = (error: Error | AuthkunError) => error instanceof AuthkunError;

export const errorMiddleware = (
  error: Error | AuthkunError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isAuthkunError(error)) {
    error = new AuthkunError({
      type: AuthkunErrorType.InternalServerError,
      message: error.message,
    });
  }

  const status = errorTypeToStatusCode((error as AuthkunError).type);
  res.status(status).json(error);
};
