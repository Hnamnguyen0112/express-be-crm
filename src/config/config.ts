import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.string().default('3000'),
  DATABASE_HOST: z.string().describe('Database host'),
  DATABASE_DATABASE: z.string().describe('Database name'),
  DATABASE_PORT: z.string().describe('Database port'),
  DATABASE_USER: z.string().describe('Database user'),
  DATABASE_PASSWORD: z.string().describe('Database password'),
  SMTP_HOST: z.string().nullable().describe('server that will send the emails'),
  SMTP_PORT: z
    .string()
    .nullable()
    .describe('port to connect to the email server'),
  SMTP_USERNAME: z.string().nullable().describe('username for email server'),
  SMTP_PASSWORD: z.string().nullable().describe('password for email server'),
  EMAIL_FROM: z
    .string()
    .nullable()
    .describe('the from field in the emails sent by the app'),
  JWT_SECRET: z.string().describe('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: z
    .string()
    .default('30')
    .describe('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: z
    .string()
    .default('30')
    .describe('days after which refresh tokens expire'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z
    .string()
    .default('10')
    .describe('minutes after which reset password token expires'),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z
    .string()
    .default('10')
    .describe('minutes after which verify email token expires')
});

const envVars = envVarsSchema.parse(process.env);

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    database: envVars.DATABASE_DATABASE,
    user: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
};
