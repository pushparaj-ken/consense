import { Request } from "express";

export interface CustomRequest extends Request {
  admin?: any;
  user?: any;
  driver?: any;
}
