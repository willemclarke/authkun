export enum AuthkunErrors {
  UserAlreadyExists = 'UserAlreadyExists',
  Unauthorised = 'Unauthorised',
  InternalServerError = 'InternalServerError',
  UnknownErrorOccured = 'UnknownErrorOccured',
  InvalidUserLogin = 'InvalidUserLogin',
  NoRowFound = 'NoRowFound',
}
interface Metadata {
  fields: Record<string, unknown>;
}

interface AuthkunErrorType {
  type: AuthkunErrors;
  message: string;
  metadata?: Metadata;
}

export class AuthkunError extends Error {
  type: AuthkunErrorType['type'];
  message: AuthkunErrorType['message'];
  metadata?: AuthkunErrorType['metadata'];

  constructor(args: AuthkunErrorType) {
    super();
    this.type = args.type;
    this.message = args.message;
    this.metadata = args.metadata;
  }
}

export const errorTypeToStatusCode = (type: AuthkunErrors) => {
  switch (type) {
    case AuthkunErrors.NoRowFound:
      return 400;
    case AuthkunErrors.Unauthorised:
      return 401;
    case AuthkunErrors.InvalidUserLogin:
      return 403;
    case AuthkunErrors.UserAlreadyExists:
      return 409;
    case AuthkunErrors.InternalServerError:
    case AuthkunErrors.UnknownErrorOccured:
      return 500;
  }
};
