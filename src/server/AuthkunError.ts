export enum AuthkunErrorType {
  UserAlreadyExists = 'UserAlreadyExists',
  Unauthorised = 'Unauthorised',
  InternalServerError = 'InternalServerError',
  UnknownErrorOccured = 'UnknownErrorOccured',
  InvalidUserLogin = 'InvalidUserLogin',
  NoRowFound = 'NoRowFound',
}

export class AuthkunError extends Error {
  type: AuthkunErrorType;
  message: string;

  constructor({ type, message }: { type: AuthkunErrorType; message: string }) {
    super();
    this.type = type;
    this.message = message;
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
