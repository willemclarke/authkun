import { NextFunction, Request, Response } from 'express';
import { AuthkunError, AuthkunErrorType } from '../AuthkunError';
import { fromEnv, Config } from '../config/config';
import jwt from 'jsonwebtoken';

const config: Config = fromEnv();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  console.log({ authorization });

  if (!authorization) {
    throw new AuthkunError({ type: AuthkunErrorType.Unauthorised, message: 'Unauthorised' });
  }

  try {
    const token = authorization.split(' ')[1];
    console.log({ token });
    const test = jwt.verify(token, config.authSecret);
    console.log({ test });
  } catch (error) {
    throw new AuthkunError({
      type: AuthkunErrorType.Unauthorised,
      message: error instanceof Error ? error.message : 'Unauthorised',
    });
  }

  return next();
};
