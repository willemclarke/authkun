export enum AuthkunErrorType {
  UserAlreadyExists = 'UserAlreadyExists',
  Unauthorised = 'Unauthorised',
  InternalServerError = 'InternalServerError',
  UnknownErrorOccured = 'UnknownErrorOccured',
  InvalidUserLogin = 'InvalidUserLogin',
  NoRowFound = 'NoRowFound',
}

interface AuthkunArgs {
  type: AuthkunErrorType;
  message: string;
  metadata?: Record<string, unknown>;
}

export class AuthkunError extends Error {
  type: AuthkunArgs['type'];
  message: AuthkunArgs['message'];
  metadata?: AuthkunArgs['metadata'];

  constructor(args: AuthkunArgs) {
    super();
    this.type = args.type;
    this.message = args.message;
    this.metadata = args.metadata;
  }
}

export const errorTypeToStatusCode = (type: AuthkunErrorType) => {
  switch (type) {
    case AuthkunErrorType.NoRowFound:
      return 400;
    case AuthkunErrorType.Unauthorised:
      return 401;
    case AuthkunErrorType.InvalidUserLogin:
      return 403;
    case AuthkunErrorType.UserAlreadyExists:
      return 409;
    case AuthkunErrorType.InternalServerError:
    case AuthkunErrorType.UnknownErrorOccured:
      return 500;
  }
};
