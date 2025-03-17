import { userRepository } from "../repositories/user.repository";
import { User } from '../entities/user.entity';
import { DBService } from "../services/db.service";

export const userService = {

  async getUserByEmail(USER_EMAIL: string, ROLE_ID: number) {
    return await userRepository.find({
      where: {
        USER_EMAIL: USER_EMAIL,
        USER_ROLES: {
          USERROLE_ROLEID: ROLE_ID,
        },
      },
      relations: ["USER_ROLES"],
    });
  },
};
