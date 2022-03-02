export enum AuthkunErrorType {
  UserAlreadyExists = 'UserAlreadyExists',
  Unauthorised = 'Unauthorised',
  InternalServerError = 'InternalServerError',
}

export class AuthkunError extends Error {
  type: AuthkunErrorType;
  status: number;
  metadata: any;

  constructor(type: AuthkunErrorType, metadata: any) {
    super();
    this.type = type;
    this.status = this.ErrorTypeToStatusCode(this.type);
    this.metadata = metadata;
  }

  private ErrorTypeToStatusCode(type: AuthkunErrorType): number {
    switch (type) {
      case AuthkunErrorType.InternalServerError:
        return 500;
      case AuthkunErrorType.UserAlreadyExists:
        return 403;
      case AuthkunErrorType.Unauthorised:
        return 500;
    }
  }
}
