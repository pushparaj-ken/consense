
import { RegisterUserData, User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { generateAdminToken } from "../libs/auth";
import { SendEmail } from "../libs/email";
import { AppDataSource } from '../config/database';
import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { userRoleRepository } from '../repositories/user-role.repository';
import { customerRepository } from '../repositories/customer.repository';

export const adminService = {
  async createUser(data: Partial<RegisterUserData>) {
    try {
      return await AppDataSource.transaction(async (manager) => {
        const hashedPassword = data.USER_PASSWORD ? await bcrypt.hash(data.USER_PASSWORD, 10) : '';
        const userData = {
          USER_USERNAME: data.USER_EMAIL,
          USER_EMAIL: data.USER_EMAIL,
          USER_PASSWORD: hashedPassword,
          USER_FIRSTNAME: data.USER_FIRSTNAME,
          USER_LASTNAME: data.USER_LASTNAME,
          USER_PHONENO: String(data.USER_PHONENO),
        }
        let user = await manager.save(User, userData);
        const userRole = manager.create(UserRole, {
          USERROLE_USERID: user.USER_ID,
          USERROLE_ROLEID: data.ROLE_ID
        });
        await manager.save(UserRole, userRole);

        const userRoles = await manager.find(UserRole, {
          where: { USERROLE_USERID: user.USER_ID },
          relations: ["ROLE"],
        });

        const roleNames = userRoles.map((role) => role.ROLE?.ROLES_NAME);

        const tokenRecord = generateAdminToken(user.USER_ID, roleNames)
        return {
          ...user,
          Token: tokenRecord,
        };
      });
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error("Failed to create user and assign role");
    }
  },

  async loginUser(data: Partial<User>) {
    if (!data.USER_EMAIL || !data.USER_PASSWORD) {
      throw new Error("Email and Password are required");
    }
    const user = await userRepository.findOneBy({ USER_EMAIL: data.USER_EMAIL })
    if (!user) {
      throw new Error("User not Found")
    }

    const isPasswordMatched = await bcrypt.compare(data.USER_PASSWORD, user.USER_PASSWORD);
    if (!isPasswordMatched) {
      throw new Error("Password mismatch !!")
    }

    const { USER_PASSWORD, ...userWithoutPassword } = user;

    const userRoles = await userRoleRepository.find({
      where: { USERROLE_USERID: user.USER_ID },
      relations: ["ROLE"],
    });
    const roleNames = userRoles.map((role) => role.ROLE?.ROLES_NAME);

    const tokenRecord = generateAdminToken(user.USER_ID, roleNames)
    return {
      ...userWithoutPassword,
      Token: tokenRecord
    }
  },

  async updatePassword(id: number, data: any) {
    try {
      const user = await userRepository.findOneBy({ USER_ID: id });
      if (!user) {
        throw new Error('User Not Found')
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.USER_PASSWORD = hashedPassword;
      await userRepository.update(id, user);
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  }
};
