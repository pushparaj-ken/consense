import { Request, Response } from "express";
import { driverService } from "../../services/driver.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';

export const driverController = {
  Login: asyncHandler(async (req: Request, res: Response) => {
    const value = req.body;
    const role = ["FLEET", "fleet", "Fleet"];
    const response = await driverService.loginDriver(value, role);
    res.set('Authentication', response.Token);
    return response
  }),

  Register: asyncHandler(async (req: Request, res: Response) => {
    const value = req.body;
    const role = ["FLEET", "fleet", "Fleet"];
    const response = await driverService.registerDriver(value, role);
    res.set('Authentication', response.Token);
    return response.data
  }),

  VerficationCode: asyncHandler(async (req: Request) => {
    const value = req.body;
    return await driverService.verficationCode(value);
  }),

  Password: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const user = req.driver;
    const updateData = {
      ...value,
      DRIVER_ID: user.DRIVER_ID,
      DRIVER_MODIFIEDBY: user.DRIVER_ID,
      DRIVER_MODIFIEDON: new Date()
    }
    return await driverService.passwordDriver(updateData);
  }),

  SendEmail: asyncHandler(async (req: CustomRequest) => {
    let value = req.body
    if (!value.email) {
      throw new Error("Error in send Email");
    }
    return await driverService.sendEmail(value);
  }),

  VerifyEmail: asyncHandler(async (req: CustomRequest) => {
    let value = req.body
    if (!value.code) {
      throw new Error("Please enter OTP");
    }
    return await driverService.verifyEmail(value);
  }),

  ForgotPassword: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    return await driverService.forgotPasswordDriver(value);
  }),

  ResetPassword: asyncHandler(async (req: CustomRequest) => {
    const updateData = {
      token: req.params.token,
      DRIVER_PASSWORD: req.body.password
    }
    return await driverService.resetPasswordDriver(updateData);
  }),

  driverProfile: asyncHandler(async (req: CustomRequest) => {
    const driver = req.driver;
    return await driverService.getDriverById(driver.DRIVER_ID);
  }),

  UpdateDriverProfile: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const driver = req.driver;
    const updateData = {
      ...value,
      DRIVER_MODIFIEDBY: driver.DRIVER_ID,
      DRIVER_MODIFIEDON: new Date()
    }
    return await driverService.updateDriver(Number(driver.DRIVER_ID), updateData);
  }),

  refreshTokenDriver: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    return await driverService.refreshTokenDriver(value);
  }),
};
