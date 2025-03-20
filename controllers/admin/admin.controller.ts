import { Request } from "express";
import bcrypt from 'bcrypt';
import { adminService } from "../../services/admin.service";
import { roleService } from "../../services/role.service";
import { asyncHandler } from '../../utils/async-handler';
import { userService } from '../../services/user.service';
import { CustomRequest } from '../../libs/custom-request';
import { customerRepository } from '../../repositories/customer.repository';
import { driverRepository } from '../../repositories/driver.repository';
import { startSchedulers } from "../../schedulers/schedulers";
import { roleRepository } from '../../repositories/role.repository';
import { In } from 'typeorm';
import { userRepository } from '../../repositories/user.repository';

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
    const role = ["ADMIN", "admin", "Admin"];
    return await adminService.loginUser(value, role);
  }),

  getUsers: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;

    const RoleData = ["ADMIN", "admin", "Admin"];

    const role = await roleRepository.findOneBy({
      ROLES_NAME: In(RoleData),
    });
    if (!role) {
      throw new Error(`Role  not found`);
    }

    let whereClause = "WHERE 1=1";

    if (values.USER_ID) {
      whereClause += ` AND u.USER_ID = '${values.USER_ID}'`;
    }

    if (values.USER_EMAIL) {
      whereClause += ` AND u.USER_EMAIL = '${values.USER_EMAIL}'`;
    }

    if (values.USER_FIRSTNAME) {
      whereClause += ` AND u.USER_FIRSTNAME LIKE '%${values.USER_FIRSTNAME}%'`;
    }

    if (values.USER_PHONENO) {
      whereClause += ` AND u.USER_PHONENO = '${values.USER_PHONENO}'`;
    }

    whereClause += ` AND ur.USERROLE_ROLEID = '${role.ROLES_ID}'`;


    const query = `
        SELECT u.* FROM CFCM_USERS AS u
        LEFT JOIN CFCM_USERROLE AS ur ON ur.USERROLE_USERID = u.USER_ID
        ${whereClause}
        ORDER BY u.USER_ID DESC
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    `;

    const countQuery = `
        SELECT COUNT(*) AS totalItems FROM CFCM_USERS AS u
        LEFT JOIN CFCM_USERROLE AS ur ON ur.USERROLE_USERID = u.USER_ID
        ${whereClause};
    `;

    const result = await userRepository.query(query);
    const countResult = await userRepository.query(countQuery);

    return {
      users: result,
      pagination: {
        totalItems: countResult[0].totalItems,
        totalPages: Math.ceil(countResult[0].totalItems / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }),

  getUserById: asyncHandler(async (req: CustomRequest) => {
    const user = await adminService.getUserById(Number(req.params.id));
    if (!user) throw new Error("User not found");
    return user;
  }),

  updateUser: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    value.USER_PASSWORD != '' ? await bcrypt.hash(value.USER_PASSWORD, 10) : ''
    const updateData = {
      ...value,
      USER_MODIFIEDBY: admin.USER_ID,
      USER_MODIFIEDON: new Date()
    }
    const user = await adminService.getUserById(Number(req.params.id));
    if (!user) throw new Error("User not found");
    return await adminService.updateUser(Number(req.params.id), updateData);
  }),

  deleteUser: asyncHandler(async (req: CustomRequest) => {
    const user = await adminService.getUserById(Number(req.params.id));
    if (!user) throw new Error("User not found");
    return await adminService.deleteUser(Number(req.params.id));
  }),

  Dashboard: asyncHandler(async (req: CustomRequest) => {
    const totalCustomer = await customerRepository.count()
    const totalUser = await driverRepository.count()
    return {
      CustomerCount: totalCustomer,
      UserCount: totalUser
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

  SyncCustomers: asyncHandler(async (req: CustomRequest) => {
    return await adminService.transferCustomerData();
  }),

  SyncDrivers: asyncHandler(async (req: CustomRequest) => {
    return await adminService.transferDriverData();
  }),

  refreshTokenDriver: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    return await adminService.refreshTokenDriver(value);
  }),
};
