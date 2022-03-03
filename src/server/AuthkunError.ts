export enum AuthkunErrorType {
  UserAlreadyExists = 'UserAlreadyExists',
  Unauthorised = 'Unauthorised',
  InternalServerError = 'InternalServerError',
  UnknownErrorOccured = 'UnknownErrorOccured',
}

export class AuthkunError extends Error {
  type: AuthkunErrorType;
  status: number;
  message: string;

  constructor({ type, message }: { type: AuthkunErrorType; message: string }) {
    super();
    this.type = type;
    this.status = AuthkunError.ErrorTypeToStatusCode(this.type);
    this.message = message;
  }

  private static ErrorTypeToStatusCode(type: AuthkunErrorType): number {
    switch (type) {
      case AuthkunErrorType.UserAlreadyExists:
        return 403;
      case AuthkunErrorType.InternalServerError:
      case AuthkunErrorType.Unauthorised:
      case AuthkunErrorType.UnknownErrorOccured:
        return 500;
    }
  }
}
