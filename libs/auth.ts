import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/constants";

const JWT_EXPIRE = config.JWT_EXPIRE ? parseInt(config.JWT_EXPIRE) : 60;
const JWT_SECRET_USER = config.JWT_SECRET_USER as string;
const JWT_SECRET_ADMIN = config.JWT_SECRET_ADMIN as string;
const JWT_SECRET_DRIVER = config.JWT_SECRET_DRIVER as string;

function validateSecret(secret: string | undefined, type: string) {
  if (!secret) {
    throw new Error(`Missing JWT secret for ${type}`);
  }
}

export function generateDriverToken(id: string | number, roleNames: string[]): string {
  validateSecret(JWT_SECRET_DRIVER, "DRIVER");
  const expirationTimeInSeconds = JWT_EXPIRE * 60;
  const payload = {
    id: id,
    role: roleNames
  }
  return jwt.sign(payload, JWT_SECRET_DRIVER, { expiresIn: expirationTimeInSeconds });
}

export function generateUserToken(id: string | number, roleNames: string[]): string {
  validateSecret(JWT_SECRET_USER, "USER");
  const expirationTimeInSeconds = JWT_EXPIRE * 60;
  const payload = {
    id: id,
    role: roleNames
  }
  return jwt.sign(payload, JWT_SECRET_USER, { expiresIn: expirationTimeInSeconds });
}

export function generateAdminToken(id: string | number, roleNames: string[]): string {
  validateSecret(JWT_SECRET_ADMIN, "ADMIN");
  const expirationTimeInSeconds = JWT_EXPIRE * 60;
  const payload = {
    id: id,
    role: roleNames
  }
  return jwt.sign(payload, JWT_SECRET_ADMIN, { expiresIn: expirationTimeInSeconds });
}


export function validRefreshToken(token: string) {
  const payload = jwt.decode(token) as JwtPayload;
  return payload;
}