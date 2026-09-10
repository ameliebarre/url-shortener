export interface UserTokenPayload {
  id: string;
}

export interface DecodedUserToken extends UserTokenPayload {
  jti: string;
  exp: number;
}
