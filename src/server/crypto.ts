import crypto from 'crypto';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

interface Password {
  salt: string;
  hashedPassword: string;
}

// jwt
export const createJwt = (
  payload: Parameters<typeof jwt.sign>[0],
  token: Secret,
  options?: SignOptions
) => {
  return jwt.sign(payload, token, { ...options, expiresIn: '30s' });
};

// cryptography
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
