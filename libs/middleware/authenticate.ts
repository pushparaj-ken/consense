import { Request, Response, NextFunction } from "express";
import passport from "../middleware/passport";

interface CustomRequest extends Request {
  user?: any;
  admin?: any;
  driver?: any;
}

export const authenticateDriver = (req: CustomRequest, res: Response, next: NextFunction) => {
  passport.authenticate("driver-login", { session: false }, (err: any, driver: any, info: any) => {
    if (err || !driver) {
      const error = new Error(info?.message || "Unauthorized");
      (error as any).statusCode = 401;
      return next(error);
    }
    req.driver = driver;
    next();
  })(req, res, next);
};

export const authenticateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  passport.authenticate("user-login", { session: false }, (err: any, user: any, info: any) => {
    if (err || !user) {
      const error = new Error(info?.message || "Unauthorized");
      (error as any).statusCode = 401;
      return next(error);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const authenticateAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  passport.authenticate("admin-login", { session: false }, (err: any, admin: any, info: any) => {
    if (err || !admin) {
      const error = new Error(info?.message || "Unauthorized");
      (error as any).statusCode = 401;
      return next(error);
    }
    req.admin = admin;
    next();
  })(req, res, next);
};
