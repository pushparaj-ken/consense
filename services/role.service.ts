import { roleRepository } from "../repositories/role.repository";
import { AssignRoleData, Role } from '../entities/role.entity';
import { DBService } from "../services/db.service";
import { userRoleRepository } from '../repositories/user-role.repository';

export const roleService = {

  async createRole(data: Partial<Role>) {
    return await roleRepository.save(data);
    // const record = {
    //   TableName_i: "CFCM_ROLES",
    //   OperationType_i: "I",
    //   RecordData_i: data,
    //   PrimaryKey_i: "ROLES_ID",
    //   PrimaryKeyValue_i: null,
    //   UserId_i: 0
    // }
    // return await DBService.saveChangesAsync('InsertUpdateDelete_prc', record);
  },

  async getRoles() {
    return await roleRepository.find();
  },

  async getRoleById(ROLES_ID: number) {
    return await roleRepository.findOneBy({ ROLES_ID });
  },

  async updateRole(ROLES_ID: number, data: Partial<Role>) {
    // const record = {
    //   TableName_i: "CFCM_ROLES",
    //   OperationType_i: "U",
    //   RecordData_i: data,
    //   PrimaryKey_i: "ROLES_ID",
    //   PrimaryKeyValue_i: ROLES_ID,
    //   UserId_i: 0
    // }
    await roleRepository.update(ROLES_ID, data);
    return await roleRepository.findOneBy({ ROLES_ID });
    // return await DBService.saveChangesAsync('InsertUpdateDelete_prc', record);
  },

  async deleteRole(id: number) {
    return await roleRepository.delete(id);
    // const record = {
    //   TableName_i: "CFCM_ROLES",
    //   OperationType_i: "D",
    //   RecordData_i: null,
    //   PrimaryKey_i: "ROLES_ID",
    //   PrimaryKeyValue_i: id,
    //   UserId_i: 0
    // }
    // return await DBService.saveChangesAsync('InsertUpdateDelete_prc', record);
  },

  async assignRole(data: Partial<AssignRoleData>) {
    const userRoles = await userRoleRepository.find({
      where: { USERROLE_USERID: data.DRIVER_USERID, USERROLE_ROLEID: data.ROLE_ID },
      relations: ["ROLE"],
    });
    if (userRoles.length > 0) {
      throw new Error("User Role Already Assigned");
    }
    const createData = {
      USERROLE_USERID: data.DRIVER_USERID,
      USERROLE_ROLEID: data.ROLE_ID
    }
    return await userRoleRepository.save(createData);
  },
};
