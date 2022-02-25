import { config } from 'dotenv';

config();

export interface Config {
  databaseUrl: string;
  authSecret: string;
}

export const getEnv = (value: string) => {
  const env = process.env[value];
  if (!env) {
    throw new Error(`Unable to get ${value} from environment variables`);
  } else {
    return env;
  }
};

export const fromEnv = (): Config => {
  return {
    databaseUrl: getEnv('DATABASE_URL'),
    authSecret: getEnv('AUTH_SECRET'),
  };
};
