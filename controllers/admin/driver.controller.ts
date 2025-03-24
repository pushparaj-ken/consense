import bcrypt from 'bcrypt';
import { driverService } from "../../services/driver.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { customerRepository } from '../../repositories/customer.repository';

export const driverController = {
  createDriver: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const customer = await customerRepository.findOneBy({ CUSTOMER_ID: value.DRIVER_CUSTOMERID });
    if (!customer) {
      throw new Error("Customer not Found");
    }
    const hashedPassword = value.DRIVER_PASSWORD ? await bcrypt.hash(value.DRIVER_PASSWORD, 10) : '';
    const createData = {
      ...value,
      DRIVER_PASSWORD: hashedPassword,
      DRIVER_CREATEDBY: admin.USER_ID,
      DRIVER_CREATEDON: new Date()
    }
    return await driverService.createDriver(createData);
  }),

  getDrivers: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;

    let query: any = {}
    if (values.DRIVER_CUSTOMERID != '' && values.DRIVER_CUSTOMERID != null && values.DRIVER_CUSTOMERID != undefined) {
      query.DRIVER_CUSTOMERID = { CUSTOMER_ID: Number(values.DRIVER_CUSTOMERID) };
    }
    query.DRIVER_STATUS = 0
    const result = await driverService.getDrivers(limit, offset, query);

    return {
      driver: result.driver,
      pagination: {
        totalItems: result.totalItems,
        totalPages: Math.ceil(result.totalItems / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }),

  getDriverById: asyncHandler(async (req: CustomRequest) => {
    const role = await driverService.getDriverById(Number(req.params.id));
    if (!role) throw new Error("Driver not found");
    return role;
  }),

  updateDriver: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const updateData = {
      ...value,
      DRIVER_MODIFIEDBY: admin.USER_ID,
      DRIVER_MODIFIEDON: new Date()
    }
    const updatedDriver = await driverService.updateDriver(Number(req.params.id), updateData);
    if (!updatedDriver) throw new Error("Driver not found");
    return updatedDriver;
  }),

  deleteDriver: asyncHandler(async (req: CustomRequest) => {
    const admin = req.admin;
    const deleteData = {
      DRIVER_STATUS: 1,
      DRIVER_MODIFIEDBY: admin.USER_ID,
      DRIVER_MODIFIEDON: new Date()
    }
    const driver = await driverService.getDriverById(Number(req.params.id));
    if (!driver) throw new Error("Driver not found");
    return await driverService.deleteDriver(Number(req.params.id), deleteData);
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

  UpdatePassword: asyncHandler(async (req: CustomRequest) => {
    let value = req.body
    let admin = req.admin
    if (value.password !== value.cpassword) {
      throw new Error("Passwords do not match");
    }
    return await driverService.updatePassword(admin.USER_ID, value);
  }),
};
