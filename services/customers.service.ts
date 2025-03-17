import { customerRepository } from "../repositories/customer.repository";
import { Customer } from '../entities/customer.entity';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { roleRepository } from '../repositories/role.repository';
import { In } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';

export const customersService = {

  async createCustomer(data: Partial<Customer>) {
    try {
      return await AppDataSource.transaction(async (manager) => {
        const userData = {
          USER_USERNAME: data.CUSTOMER_EMAIL,
          USER_EMAIL: data.CUSTOMER_EMAIL,
          USER_PASSWORD: data.CUSTOMER_PASSWORD,
          USER_FIRSTNAME: data.CUSTOMER_FIRSTNAME,
          USER_LASTNAME: data.CUSTOMER_LASTNAME,
          USER_CREATEDBY: data.CUSTOMER_CREATEDBY,
          USER_CREATEDON: data.CUSTOMER_CREATEDON
        }
        let user = await manager.save(User, userData);
        const role = await roleRepository.findOneBy({
          ROLES_NAME: In(["CUSTOMER", "customer", "Customer"]),
        });
        if (!role) {
          throw new Error("Role Not Found")
        }
        const userRole = manager.create(UserRole, {
          USERROLE_USERID: user.USER_ID,
          USERROLE_ROLEID: role.ROLES_ID
        });
        data.CUSTOMER_USERID = user.USER_ID
        return await customerRepository.save(data);
      });
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error("Failed to create user and assign role");
    }
  },

  async getCustomers(limit: number, offset: number, query: any) {
    const [customers, totalItems] = await customerRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { customers, totalItems };
  },

  async getCustomerById(CUSTOMER_ID: number) {
    return await customerRepository.findOneBy({ CUSTOMER_ID });
  },

  async updateCustomer(CUSTOMER_ID: number, data: Partial<Customer>) {
    await customerRepository.update(CUSTOMER_ID, data);
    return await customerRepository.findOneBy({ CUSTOMER_ID });
  },

  async deleteCustomer(id: number, data: Partial<Customer>) {
    return await customerRepository.update(id, data);
  },
};
