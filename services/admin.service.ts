
import { RegisterUserData, UpdateUserData, User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { generateAdminToken, validRefreshToken } from "../libs/auth";
import { SendEmail } from "../libs/email";
import { AppDataSource } from '../config/database';
import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { userRoleRepository } from '../repositories/user-role.repository';
import { customerRepository } from '../repositories/customer.repository';
import { generateEmail } from '../libs/custom-function';
import { roleRepository } from '../repositories/role.repository';
import { kundenService } from '../schedulers/service/kunden-dest.service';
import { In } from 'typeorm';
import { driverRepository } from '../repositories/driver.repository';
import { RoleName } from '../libs/global/enum';

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
        let user: any = await manager.save(User, userData);
        for (const each of data.ROLE_ID || []) {
          const userRole = {
            USERROLE_USERID: user.USER_ID,
            USERROLE_ROLEID: each
          };
          await manager.save(UserRole, userRole);
        }

        const userRoles = await manager.find(UserRole, {
          where: { USERROLE_USERID: user.USER_ID },
          relations: ["ROLE"],
        });

        const roleNames = userRoles.map((role) => role.ROLE?.ROLES_NAME);
        if (roleNames.includes(RoleName.DRIVER) || roleNames.includes(RoleName.FLEET)) {
          const driverData = {
            DRIVER_USERID: user.USER_ID,
            DRIVER_CUSTOMERID: { CUSTOMER_ID: data.CUSTOMER_ID },
            DRIVER_FIRSTNAME: data.USER_FIRSTNAME,
            DRIVER_LASTNAME: data.USER_LASTNAME,
            DRIVER_PHONENO: String(data.USER_PHONENO),
            DRIVER_EMAIL: data.USER_EMAIL,
            DRIVER_PASSWORD: hashedPassword,
          }
          return await driverRepository.save(driverData);
        }

        if (roleNames.includes(RoleName.CUSTOMER)) {
          const customerData = {
            CUSTOMER_USERID: user.USER_ID,
            CUSTOMER_CODE: Math.floor(10000000 + Math.random() * 90000000),
            CUSTOMER_FIRSTNAME: data.USER_FIRSTNAME,
            CUSTOMER_LASTNAME: data.USER_LASTNAME,
            CUSTOMER_PHONENO: String(data.USER_PHONENO),
            CUSTOMER_EMAIL: data.USER_EMAIL,
            CUSTOMER_PASSWORD: hashedPassword,
          }
          return await customerRepository.save(customerData);
        }

        const tokenRecord = generateAdminToken(user.USER_ID, roleNames)
        user.DRIVER_ROLE = roleNames
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

  async getUsers(limit: number, offset: number, query: any) {
    const [user, totalItems] = await userRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { user, totalItems };
  },

  async getUserById(USER_ID: number) {
    return await userRepository.findOneBy({ USER_ID });
  },

  async updateUser(USER_ID: number, data: Partial<UpdateUserData>) {
    if (data.ROLE_ID && Array.isArray(data.ROLE_ID)) {
      const existingRoles = await userRoleRepository.find({
        where: { USERROLE_USERID: USER_ID }
      });

      const existingRoleIDs = existingRoles.map(role => role.USERROLE_ROLEID);

      const rolesToDelete = existingRoleIDs.filter(role => !data.ROLE_ID?.includes(role));

      const rolesToAdd = data.ROLE_ID.filter(role => !existingRoleIDs.includes(role));

      if (rolesToDelete.length > 0) {
        await userRoleRepository.delete({
          USERROLE_USERID: USER_ID,
          USERROLE_ROLEID: In(rolesToDelete)
        });
      }
      for (const each of rolesToAdd) {
        const newUserRole = {
          USERROLE_USERID: USER_ID,
          USERROLE_ROLEID: each
        };
        await userRoleRepository.save(newUserRole);
      }
    }
    delete data.ROLE_ID;
    data.USER_PHONENO = String(data.USER_PHONENO)
    await userRepository.update(USER_ID, data);
    return await userRepository.findOneBy({ USER_ID });
  },

  async deleteUser(id: number) {
    const userRoles = await userRoleRepository.find({
      where: { USERROLE_USERID: id },
      relations: ["ROLE"],
    });
    const adminRoles = userRoles
      .filter(role => role.ROLE && ["ADMIN", "admin", "Admin"].includes(role.ROLE.ROLES_NAME))
      .map(role => role.ROLE.ROLES_ID);

    if (adminRoles.length > 0) {
      await userRoleRepository.delete({
        USERROLE_USERID: id,
        USERROLE_ROLEID: In(adminRoles),
      });
    }
    return await userRepository.delete(id);
  },

  async loginUser(data: Partial<User>, RoleData: any) {
    if (!data.USER_EMAIL || !data.USER_PASSWORD) {
      throw new Error("Email and Password are required");
    }
    const user: any = await userRepository.findOneBy({ USER_EMAIL: data.USER_EMAIL })
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
    const roleExists = roleNames.some((role) =>
      RoleData.includes(role?.toLowerCase())
    );

    if (!roleExists) {
      throw new Error("Your account has not been approved for login. Please contact the administration for further assistance.");
    }
    const tokenRecord = generateAdminToken(user.USER_ID, roleNames)
    userWithoutPassword.DRIVER_ROLE = roleNames
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
  },

  async transferCustomerData() {
    try {
      console.log("Customer Initializing Source and Destination Databases...");

      const kundenRecords = await kundenService.getKundens();

      if (kundenRecords.length === 0) {
        throw new Error("No Customer records found to transfer.");
      }

      const [role] = await Promise.all([
        roleRepository.findOneBy({ ROLES_NAME: In(["CUSTOMER", "customer", "Customer"]) }),
      ]);
      if (!role) throw new Error("Role Not Found");

      for (const kunden of kundenRecords) {
        const existingCustomer = await customerRepository.findOneBy({
          CUSTOMER_DUPICATEID: kunden.TenantItemId
        });

        if (existingCustomer) continue;

        const customerEmail = generateEmail(kunden.Firmenbezeichnung, 0)

        const userDataCustomer = {
          USER_USERNAME: customerEmail,
          USER_EMAIL: customerEmail,
          USER_FIRSTNAME: kunden.Vorname ?? "",
          USER_LASTNAME: kunden.Nachname ?? "",
        }
        // console.log("🚀 ~ returnawaitAppDataSource.transaction ~ userDataCustomer:", userDataCustomer)

        let userCustomer = await userRepository.save(userDataCustomer);

        await userRoleRepository.save({
          USERROLE_USERID: userCustomer.USER_ID,
          USERROLE_ROLEID: role.ROLES_ID
        });

        const customerData = {
          CUSTOMER_USERID: userCustomer.USER_ID,
          CUSTOMER_DUPICATEID: kunden.TenantItemId,
          CUSTOMER_CODE: Math.floor(10000000 + Math.random() * 90000000),
          CUSTOMER_COMPANYNAME: kunden.Firmenbezeichnung ?? "",
          CUSTOMER_FIRSTNAME: kunden.Vorname ?? "",
          CUSTOMER_LASTNAME: kunden.Nachname ?? "",
          CUSTOMER_EMAIL: customerEmail,
        }

        // console.log("🚀 ~ returnawaitAppDataSource.transaction ~ customerData:", customerData)

        await customerRepository.save(customerData)

      }
      console.log(`Customer New records successfully transferred.`);
      return "Customers records successfully transferred.";
    } catch (error: any) {
      console.error("Error during data transfer:", error);
      throw new Error(error)
    }
  },

  async transferDriverData() {
    try {
      console.log("Driver Initializing Source and Destination Databases...");

      const [roleDriver] = await Promise.all([
        roleRepository.findOneBy({ ROLES_NAME: In(["DRIVER", "driver", "Driver"]) }),
      ]);

      if (!roleDriver) throw new Error("Role Not Found");

      const customerIds = await kundenService.getCustomerIds();

      const fahrerReocrds = await kundenService.getFahrer(customerIds);

      if (fahrerReocrds.length === 0) {
        throw new Error("No Driver records found to transfer.");
      }

      for (const fahrer of fahrerReocrds) {
        // console.log("🚀 ~ transferDriverData ~ fahrer:", fahrer)
        const existingDriver = await driverRepository.findOneBy({
          DRIVER_DUPICATEID: fahrer.DRIVER_ID
        });

        if (existingDriver) continue;

        const driverEmail = generateEmail(fahrer.EMAIL, 1)

        const userDataDriver = {
          USER_USERNAME: driverEmail,
          USER_EMAIL: driverEmail,
          USER_PHONENO: fahrer.PHONENO ?? "",
          USER_FIRSTNAME: fahrer.FIRSTNAME ?? "",
          USER_LASTNAME: fahrer.LASTNAME ?? "",
        }

        // console.log("🚀 ~ returnawaitAppDataSource.transaction ~ userDataDriver:", userDataDriver)

        let userDriver = await userRepository.save(userDataDriver);

        await userRoleRepository.save({
          USERROLE_USERID: userDriver.USER_ID,
          USERROLE_ROLEID: roleDriver.ROLES_ID
        });

        const customer = await customerRepository.findOneBy({ CUSTOMER_DUPICATEID: fahrer.CUSTOMER_ID })

        const driverData = {
          DRIVER_USERID: userDriver.USER_ID,
          DRIVER_DUPICATEID: fahrer.DRIVER_ID,
          DRIVER_CUSTOMERID: { CUSTOMER_ID: customer?.CUSTOMER_ID },
          DRIVER_FIRSTNAME: fahrer.FIRSTNAME ?? "",
          DRIVER_LASTNAME: fahrer.LASTNAME ?? "",
          DRIVER_EMAIL: driverEmail,
          DRIVER_PHONENO: fahrer.PHONENO ?? "",
          DRIVER_ADDRESS1: fahrer.STREET ?? "",
          DRIVER_ADDRESS2: fahrer.CITY ?? "",
          DRIVER_ADDRESS3: fahrer.COUNTRY ?? "",
          DRIVER_ZIPCODE: Number.isInteger(parseInt(fahrer.ZIPCODE)) ? parseInt(fahrer.ZIPCODE) : 0,
        };

        // console.log("🚀 ~ returnawaitAppDataSource.transaction ~ driverData:", driverData)

        await driverRepository.save(driverData);
      }
      console.log(`Driver New records successfully transferred.`);
      return "Driver records successfully transferred.";
    } catch (error: any) {
      console.error("Error during data transfer:", error);
      throw new Error(error)
    }
  },

  async refreshTokenDriver(data: any) {
    try {
      if (!data.refreshToken) {
        throw new Error('Refresh token is required')
      }
      const decoded = validRefreshToken(data.refreshToken)
      if (!decoded?.exp) {
        throw new Error('Invalid requested token')
      }
      let refreshedToken = data.refreshToken;
      const timeNow = Math.floor(Date.now() / 1000);
      const isTokenExpired = decoded.exp < timeNow;
      if (isTokenExpired) {
        const user = await userRepository.findOneBy({ USER_ID: decoded.id })
        if (!user) throw new Error('Invalid driver');

        const role = await roleRepository.findOneBy({
          ROLES_NAME: In(["DRIVER", "driver", "Driver"]),
        });

        if (!role) {
          throw new Error("Role Not Found")
        }

        const userRoles = await userRoleRepository.find({
          where: { USERROLE_USERID: user.USER_ID },
          relations: ["ROLE"],
        });

        const roleNames = userRoles.map((role) => role.ROLE?.ROLES_NAME);
        refreshedToken = generateAdminToken(user.USER_ID, roleNames)
      }

      return refreshedToken;
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  },
};
