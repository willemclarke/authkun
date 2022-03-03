import { NextFunction, Request, Response } from 'express';
import { AuthkunError, AuthkunErrorType } from '../AuthkunError';

export const errorMiddleware = (
  error: Error | AuthkunError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authkunError = error;

  if (!(error instanceof AuthkunError)) {
    authkunError = new AuthkunError({
      type: AuthkunErrorType.UnknownErrorOccured,
      message: authkunError.message,
    });

    res.status((authkunError as AuthkunError).status).send(authkunError);
  }
};
