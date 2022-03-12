export interface User {
  id: string;
  username: string;
}

export interface JwtToken {
  exp: number;
  iat: number;
  id: string;
  username: string;
}
