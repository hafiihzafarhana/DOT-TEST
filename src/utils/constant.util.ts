import { config } from "dotenv";

config();

export const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_URL,

  JWT_SECRET_KEY_ACCESS,
  JWT_SECRET_KEY_REFRESH,
  JWT_ACC_TIME,
  JWT_REFRESH_TIME,
  PORT,
  NODE_ENV,
  ORIGIN,
  CREDENTIALS,

  USER_ID,
  ADMIN_ID,
} = process.env;
