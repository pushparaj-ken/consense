import { Request } from "express";
import { adminService } from "../../services/admin.service";
import { roleService } from "../../services/role.service";
import { asyncHandler } from '../../utils/async-handler';
import { userService } from '../../services/user.service';
import { CustomRequest } from '../../libs/custom-request';
import { customerRepository } from '../../repositories/customer.repository';
import { driverRepository } from '../../repositories/driver.repository';

export const adminController = {

  Register: asyncHandler(async (req: Request) => {
    const value = req.body;
    const role = await roleService.getRoleById(value.ROLE_ID)
    if (!role) {
      throw new Error("Role not found");
    }
    const user = await userService.getUserByEmail(value.USER_EMAIL, value.ROLE_ID)
    if (user.length > 0) {
      throw new Error("Email Already Exists");
    }
    return await adminService.createUser(value);
  }),

  Login: asyncHandler(async (req: Request) => {
    const value = req.body;
    return await adminService.loginUser(value);
  }),

  Dashboard: asyncHandler(async (req: CustomRequest) => {
    const totalCustomer = await customerRepository.count()
    const totalDriver = await driverRepository.count()
    return {
      CustomerCount: totalCustomer,
      DriverCount: totalDriver
    };
  }),

  UpdatePassword: asyncHandler(async (req: CustomRequest) => {
    let value = req.body
    let admin = req.admin
    if (value.password !== value.cpassword) {
      throw new Error("Passwords do not match");
    }
    return await adminService.updatePassword(admin.USER_ID, value);
  }),
};
