import { userRepository } from "../repositories/user.repository";
import { In } from 'typeorm';

export const userService = {

  async getUserByEmail(USER_EMAIL: string, ROLE_ID: number[]) {
    return await userRepository.find({
      where: {
        USER_EMAIL: USER_EMAIL,
        USER_ROLES: {
          USERROLE_ROLEID: In(ROLE_ID),
        },
      },
      relations: ["USER_ROLES"],
    });
  },
};
