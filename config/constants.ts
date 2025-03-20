import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

export const ImageExtensions = ["JPG", "PNG", "JPEG", "jpg", "png", "jpeg"] as const;

type ImageExtension = typeof ImageExtensions[number];

interface EnvVars {
  NODE_ENV: 'production' | 'staging' | 'development';
  PORT: number;
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  JWT_SECRET_USER: string;
  JWT_SECRET_ADMIN: string;
  JWT_SECRET_DRIVER: string;
  JWT_EXPIRE: string;
  PASSWORD_RESET_LINK: string;
  DEST_DB_HOST: string;
  DEST_DB_PORT: string;
  DEST_DB_USERNAME: string;
  DEST_DB_PASSWORD: string;
  DEST_DB_DATABASE: string;
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
  AWS_S3_REGION: string;
  AWS_S3_BUCKET_NAME: string;
}

const envVarSchema = Joi.object<EnvVars>({
  NODE_ENV: Joi.string().valid('production', 'staging', 'development').required(),
  PORT: Joi.number().default(5000),
  DB_HOST: Joi.string().required().description('hostname of the MSSQL the server connects to'),
  DB_PORT: Joi.string().required().description('he port number of MYSQL the server connects to'),
  DB_USERNAME: Joi.string().required().description('Database Username'),
  DB_PASSWORD: Joi.string().required().description('Database Password'),
  DB_DATABASE: Joi.string().required().description('Database Name'),
  JWT_SECRET_USER: Joi.string().required().description('secret key User used to sign in'),
  JWT_SECRET_ADMIN: Joi.string().required().description('secret key Admin used to sign in'),
  JWT_SECRET_DRIVER: Joi.string().required().description('secret key Driver used to sign in'),
  JWT_EXPIRE: Joi.number().required().description('milliseconds after which the session expires'),
  PASSWORD_RESET_LINK: Joi.string().required().description('Reset Password Link'),
  DEST_DB_HOST: Joi.string().required().description('Destination  hostname of the MSSQL the server connects to'),
  DEST_DB_PORT: Joi.string().required().description('Destination  The port number of MYSQL the server connects to'),
  DEST_DB_USERNAME: Joi.string().required().description('Destination Database Username'),
  DEST_DB_PASSWORD: Joi.string().required().description('Destination Database Password'),
  DEST_DB_DATABASE: Joi.string().required().description('Destination Database Name'),
  AWS_S3_ACCESS_KEY_ID: Joi.string().required().description('Aws AccessKey'),
  AWS_S3_SECRET_ACCESS_KEY: Joi.string().required().description('Aws SecretKey'),
  AWS_S3_REGION: Joi.string().required().description('Aws Region'),
  AWS_S3_BUCKET_NAME: Joi.string().required().description('Aws BucketName'),
}).unknown();

const { value: envVar, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: EnvVars = {
  NODE_ENV: envVar.NODE_ENV,
  PORT: envVar.PORT,
  DB_HOST: envVar.DB_HOST,
  DB_PORT: envVar.DB_PORT,
  DB_USERNAME: envVar.DB_USERNAME,
  DB_PASSWORD: envVar.DB_PASSWORD,
  DB_DATABASE: envVar.DB_DATABASE,
  JWT_SECRET_USER: envVar.JWT_SECRET_USER,
  JWT_SECRET_ADMIN: envVar.JWT_SECRET_ADMIN,
  JWT_SECRET_DRIVER: envVar.JWT_SECRET_DRIVER,
  JWT_EXPIRE: envVar.JWT_EXPIRE,
  PASSWORD_RESET_LINK: envVar.PASSWORD_RESET_LINK,
  DEST_DB_HOST: envVar.DEST_DB_HOST,
  DEST_DB_PORT: envVar.DEST_DB_PORT,
  DEST_DB_USERNAME: envVar.DEST_DB_USERNAME,
  DEST_DB_PASSWORD: envVar.DEST_DB_PASSWORD,
  DEST_DB_DATABASE: envVar.DEST_DB_DATABASE,
  AWS_S3_ACCESS_KEY_ID: envVar.AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY: envVar.AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION: envVar.AWS_S3_REGION,
  AWS_S3_BUCKET_NAME: envVar.AWS_S3_BUCKET_NAME,
};