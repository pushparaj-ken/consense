import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { userRepository } from '../../repositories/user.repository';
import { config } from '../../config/constants';
import { driverRepository } from '../../repositories/driver.repository';

interface JwtPayload {
  id: string;
  role: any;
}

const userOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_USER as string,
};

const adminOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_ADMIN as string,
};

const driverOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_DRIVER as string,
};

passport.use("driver-login", new JwtStrategy(driverOptions, async (payload: JwtPayload, done: any) => {
  try {
    let driver: any = await driverRepository.findOne({
      where: { DRIVER_ID: Number(payload.id) },
      relations: ["DRIVER_CUSTOMERID"],
    });
    if (driver) {
      driver.role = payload?.role;
      return done(null, driver);
    } else {
      return done(null, false, { message: "Unauthorized" });
    }
  } catch (error) {
    return done(error, false);
  }
}));

passport.use("user-login", new JwtStrategy(userOptions, async (payload: JwtPayload, done: any) => {
  try {
    const user: any = await driverRepository.findOneBy({ DRIVER_ID: Number(payload.id) });
    if (user) {
      user.role = payload?.role;
      return done(null, user);
    } else {
      return done(null, false, { message: "Unauthorized" });
    }
  } catch (error) {
    return done(error, false);
  }
}));

passport.use("admin-login", new JwtStrategy(adminOptions, async (payload: JwtPayload, done: any) => {
  try {
    const admin: any = await userRepository.findOneBy({ USER_ID: Number(payload.id) });
    if (admin) {
      admin.role = payload?.role;
      return done(null, admin);
    } else {
      return done(null, false, { message: "Unauthorized" });
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
