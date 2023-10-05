export interface TokenPayload {
  session_id: string;
  user_id: string;
  role_id?: string;
  iat?: number;
  exp?: number;
}
