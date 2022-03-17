import { NextFunction, Request, Response } from 'express';
import { AuthkunError, AuthkunErrors } from '../AuthkunError';
import { fromEnv, Config } from '../config/config';
import jwt from 'jsonwebtoken';

const config: Config = fromEnv();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new AuthkunError({ type: AuthkunErrors.Unauthorised, message: 'Unauthorised' });
  }

  try {
    const token = authorization.split(' ')[1];
    const jwtPayload = jwt.verify(token, config.authSecret);
  } catch (error) {
    throw new AuthkunError({
      type: AuthkunErrors.Unauthorised,
      message: error instanceof Error ? error.message : 'Unauthorised',
    });
  }

  return next();
};
