import crypto from 'crypto';

interface Password {
  salt: string;
  hashedPassword: string;
}

export const hashAndSaltPassword = (password: string): Password => {
  const salt = crypto.randomBytes(20).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

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
  return (
    crypto.pbkdf2Sync(plainTextPassword, salt, 1000, 64, 'sha512').toString('hex') ===
    hashedPassword
  );
};
