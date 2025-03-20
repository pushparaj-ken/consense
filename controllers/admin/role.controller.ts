import { roleService } from "../../services/role.service";
import { asyncHandler } from '../../utils/async-handler';
import { RoleName } from '../../libs/global/enum';
import { CustomRequest } from '../../libs/custom-request';
import { driverRepository } from '../../repositories/driver.repository';
import { userRoleRepository } from '../../repositories/user-role.repository';

export const roleController = {
  createRole: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    if (!Object.values(RoleName).includes(value.ROLES_NAME)) {
      throw new Error('ROLES_NAME must be one of the following: Admin, Fleet, Driver, Customer.');
    }
    const createData = {
      ...value
    }
    return await roleService.createRole(createData);
  }),

  getRoles: asyncHandler(async () => {
    return await roleService.getRoles();
  }),

  getRoleById: asyncHandler(async (req: CustomRequest) => {
    const role = await roleService.getRoleById(Number(req.params.id));
    if (!role) throw new Error("Role not found");
    return role;
  }),

  updateRole: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const updateData = {
      ...value,
      ROLES_MODIFIEDBY: admin.USER_ID,
      ROLES_MODIFIEDON: new Date()
    }
    const updatedRole = await roleService.updateRole(Number(req.params.id), updateData);
    if (!updatedRole) throw new Error("Role not found");
    return updatedRole;
  }),

  deleteRole: asyncHandler(async (req: CustomRequest) => {
    const role = await roleService.getRoleById(Number(req.params.id));
    if (!role) throw new Error("Role not found");
    return await roleService.deleteRole(Number(req.params.id));
  }),

  assignRole: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const [role, driver] = await Promise.all([
      roleService.getRoleById(Number(value.ROLE_ID)),
      driverRepository.findOneBy({ DRIVER_ID: value.DRIVER_ID }),
    ]);

    if (!role) throw new Error("Role not found");
    if (!driver) throw new Error("Driver not found");
    value.DRIVER_USERID = driver.DRIVER_USERID
    return await roleService.assignRole(value);
  }),
};
