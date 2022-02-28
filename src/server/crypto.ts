import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface Password {
  salt: string;
  hashedPassword: string;
}

export const createJwt = (payload: any, token: string) => {
  return jwt.sign({ payload }, token, { expiresIn: '10h' });
};

const createSalt = () => crypto.randomBytes(20).toString('hex');

const hashPassword = (password: string, salt: string): string => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

export const hashAndSaltUserPassword = (password: string): Password => {
  const salt = createSalt();
  const hashedPassword = hashPassword(password, salt);

  return {
    salt,
    hashedPassword,
  };
};

export const verifyPassword = (
  plainTextPassword: string,
  salt: string,
  hashedPassword: string
): boolean => {
  return hashPassword(plainTextPassword, salt) === hashedPassword;
};
