import { TokenPayload } from "@interfaces/token.interface";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import {
  JWT_SECRET_KEY_REFRESH,
  JWT_SECRET_KEY_ACCESS,
  JWT_ACC_TIME,
  JWT_REFRESH_TIME,
} from "@/utils/constant.util";

export const SECRET_KEY: Secret = JWT_SECRET_KEY_ACCESS as Secret;
export const REFRESH_SECRET_KEY: Secret = JWT_SECRET_KEY_REFRESH as Secret;
const ACCESS_TOKEN_EXPIRATION = JWT_ACC_TIME as string;
const REFRESH_TOKEN_EXPIRATION = JWT_REFRESH_TIME as string;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

export const verifyRefreshToken = (refreshToken: string): TokenPayload => {
  const payload = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as TokenPayload;
  return payload;
};

export const verifyAccessToken = (accessToken: string): TokenPayload => {
  const payload = jwt.verify(accessToken, SECRET_KEY) as TokenPayload;
  return payload;
};
