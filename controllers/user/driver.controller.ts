import { Request, Response } from "express";
import { driverService } from "../../services/driver.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { upload } from '../../libs/image'

export const driverController = {
  Login: asyncHandler(async (req: Request, res: Response) => {
    const value = req.body;
    const role = ["DRIVER", "driver", "Driver"];
    const response = await driverService.loginDriver(value, role);
    res.set('Authentication', response.Token);
    return response.data
  }),

  Register: asyncHandler(async (req: Request, res: Response) => {
    const value = req.body;
    const role = ["DRIVER", "driver", "Driver"];
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
      token: req.body.token,
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

  imageUpload: asyncHandler(async (req: CustomRequest) => {
    const files: any = req.files;
    if (files.image == '' && files.image == null && files.image == undefined) {
      throw new Error("All Fields are Mandatory");
    }
    let image_new = "";
    if (files.image) {
      const { buffer, originalname } = files.image[0];
      let image = await upload(buffer, originalname, "common_image");
      image_new = image.Location;
    } else {
      image_new = image_new;
    }
    return image_new;
  }),

  multiplImageUpload: asyncHandler(async (req: CustomRequest) => {
    const files: any = req.files;
    if (files.images == '' && files.images == null && files.images == undefined) {
      throw new Error("All Fields are Mandatory");
    }
    let image_new = [];
    if (files.images) {
      for (let each of files.images) {
        const { buffer, originalname } = each;
        let image = await upload(buffer, originalname, "common_image");
        image_new.push(image.Location);
      }
    } else {
      image_new = [];
    }
    return image_new;
  }),

  viewResetPassword: asyncHandler(async (req: CustomRequest, res: Response) => {
    var action = 'Reset Password';
    res.set('content-type', 'text/html; charset=mycharset');
    let data: any = {}; let resetPassword = {}; let errorData = {};
    data.token = req.params.id
    res.render('reset-password', { page_title: "Consense - Reset Password", data: data, resetPassword: resetPassword, action: action });
  }),
};
