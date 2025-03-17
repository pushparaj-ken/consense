import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { userRepository } from '../../repositories/user.repository';
import { config } from '../../config/constants';
import { driverRepository } from '../../repositories/driver.repository';

interface JwtPayload {
  id: string;
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
    const driver = await driverRepository.findOneBy({ DRIVER_ID: Number(payload.id) });
    if (driver) {
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
    const user = await driverRepository.findOneBy({ DRIVER_ID: Number(payload.id) });
    if (user) {
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
    const admin = await userRepository.findOneBy({ USER_ID: Number(payload.id) });
    if (admin) {
      return done(null, admin);
    } else {
      return done(null, false, { message: "Unauthorized" });
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
