import { driverRepository } from "../repositories/driver.repository";
import { Driver, ForgetPasswordDriverData, LoginDriverData, PasswordDriverData, RegisterDriverData, ResetPasswordDriverData, VerficationCodeData } from '../entities/driver.entity';
import { SendEmail } from "../libs/email";
import { generateDriverToken, validRefreshToken } from "../libs/auth";
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { roleRepository } from '../repositories/role.repository';
import { In } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { UserRole } from '../entities/user-role.entity';
import { userRoleRepository } from '../repositories/user-role.repository';
import { customerRepository } from '../repositories/customer.repository';
import { userRepository } from '../repositories/user.repository';
import { config } from "../config/constants";

export const driverService = {

  async createDriver(data: Partial<Driver>) {
    try {
      return await AppDataSource.transaction(async (manager) => {
        const userData = {
          USER_USERNAME: data.DRIVER_EMAIL,
          USER_EMAIL: data.DRIVER_EMAIL,
          USER_FIRSTNAME: data.DRIVER_FIRSTNAME,
          USER_PASSWORD: data.DRIVER_PASSWORD,
          USER_LASTNAME: data.DRIVER_LASTNAME,
          USER_CREATEDBY: data.DRIVER_CREATEDBY,
          USER_CREATEDON: data.DRIVER_CREATEDON
        }
        let user = await manager.save(User, userData);
        const role = await roleRepository.findOneBy({
          ROLES_NAME: In(["DRIVER", "driver", "Driver"]),
        });
        if (!role) {
          throw new Error("Role Not Found")
        }
        const userRole = manager.create(UserRole, {
          USERROLE_USERID: user.USER_ID,
          USERROLE_ROLEID: role.ROLES_ID
        });
        data.DRIVER_USERID = user.USER_ID
        return await driverRepository.save(data);
      });
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error("Failed to create user and assign role");
    }
  },

  async getDrivers(limit: number, offset: number, query: any) {
    const [driver, totalItems] = await driverRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { driver, totalItems };
  },

  async getDriverById(DRIVER_ID: number) {
    return await driverRepository.findOneBy({ DRIVER_ID });
  },

  async updateDriver(DRIVER_ID: number, data: Partial<Driver>) {
    await driverRepository.update(DRIVER_ID, data);
    return await driverRepository.findOneBy({ DRIVER_ID });
  },

  async deleteDriver(id: number, data: Partial<Driver>) {
    return await driverRepository.update(id, data);
  },

  async loginDriver(data: Partial<LoginDriverData>, RoleData: any) {
    if (!data.DRIVER_EMAIL || !data.DRIVER_PASSWORD || !data.CUSTOMER_CODE) {
      throw new Error("All Field are Mandatory");
    }
    const customer = await customerRepository.findOneBy({ CUSTOMER_CODE: data.CUSTOMER_CODE })
    if (!customer) {
      throw new Error("Customer Code not Exists");
    }
    const driver: any = await driverRepository.findOneBy({ DRIVER_EMAIL: data.DRIVER_EMAIL })
    if (!driver) {
      throw new Error("Driver not Found")
    }

    if (!driver.DRIVER_EMAILVERFIED) {
      throw new Error("Email not Verified");
    }

    const isPasswordMatched = await bcrypt.compare(data.DRIVER_PASSWORD, driver.DRIVER_PASSWORD);
    if (!isPasswordMatched) {
      throw new Error("Password mismatch !!")
    }

    const { DRIVER_PASSWORD, ...userWithoutPassword } = driver;

    const userRoles = await userRoleRepository.find({
      where: { USERROLE_USERID: driver.DRIVER_USERID },
      relations: ["ROLE"],
    });
    const roleNames = userRoles.map((role) => role.ROLE?.ROLES_NAME);
    const roleExists = roleNames.some((role) =>
      RoleData.includes(role?.toLowerCase())
    );

    if (!roleExists) {
      throw new Error("Your account has not been approved for login. Please contact the administration for further assistance.");
    }
    const tokenRecord = generateDriverToken(driver.DRIVER_ID, roleNames)
    userWithoutPassword.DRIVER_ROLE = roleNames
    return {
      data: userWithoutPassword,
      Token: tokenRecord
    }
  },

  async registerDriver(data: Partial<RegisterDriverData>, RoleData: string[]) {
    if (!data.DRIVER_EMAIL || !data.DRIVER_LASTNAME || !data.CUSTOMER_CODE) {
      throw new Error("All fields are mandatory");
    }

    let existingDriver: any = await driverRepository.findOneBy({
      DRIVER_EMAIL: data.DRIVER_EMAIL,
    });
    const hashedPassword = data.DRIVER_PASSWORD ? await bcrypt.hash(data.DRIVER_PASSWORD, 10) : '';
    let user = await userRepository.findOneBy({
      USER_EMAIL: data.DRIVER_EMAIL,
    });

    const userRoles = user
      ? await userRoleRepository.find({
        where: { USERROLE_USERID: user.USER_ID },
        relations: ["ROLE"],
      })
      : [];

    const existingRoleNames = userRoles
      .map((role) => role.ROLE?.ROLES_NAME?.toLowerCase())
      .filter(Boolean);

    const duplicateRole = RoleData.some((role) =>
      existingRoleNames.includes(role.toLowerCase())
    );

    if (duplicateRole) {
      throw new Error("Email ID already exists with the same role");
    }

    const customer = await customerRepository.findOneBy({
      CUSTOMER_CODE: data.CUSTOMER_CODE,
    });

    if (!customer) {
      throw new Error("Customer Code does not exist");
    }

    try {
      return await AppDataSource.transaction(async (manager) => {
        if (!user) {
          const userData = {
            USER_USERNAME: data.DRIVER_EMAIL,
            USER_EMAIL: data.DRIVER_EMAIL,
            USER_FIRSTNAME: data.DRIVER_FIRSTNAME,
            USER_LASTNAME: data.DRIVER_LASTNAME,
            USER_PASSWORD: hashedPassword,
          };
          user = await manager.save(User, userData);
        }

        if (!duplicateRole) {
          const role = await roleRepository.findOneBy({
            ROLES_NAME: In(RoleData),
          });
          if (!role) {
            throw new Error(`Role  not found`);
          }

          const userRole = manager.create(UserRole, {
            USERROLE_USERID: user.USER_ID,
            USERROLE_ROLEID: role.ROLES_ID,
          });
          await manager.save(UserRole, userRole);
        }


        const updatedUserRoles = await manager.find(UserRole, {
          where: { USERROLE_USERID: user.USER_ID },
          relations: ["ROLE"],
        });

        const roleNames = updatedUserRoles.map((role) => role.ROLE?.ROLES_NAME);
        if (!existingDriver) {
          const DriverData = {
            DRIVER_FIRSTNAME: data.DRIVER_FIRSTNAME,
            DRIVER_LASTNAME: data.DRIVER_LASTNAME,
            DRIVER_EMAIL: data.DRIVER_EMAIL,
            DRIVER_USERID: user.USER_ID,
            DRIVER_CUSTOMERID: { CUSTOMER_ID: customer.CUSTOMER_ID },
            DRIVER_PASSWORD: hashedPassword,
          };
          existingDriver = await driverRepository.save(DriverData);
        }

        const tokenRecord = generateDriverToken(
          existingDriver?.DRIVER_ID,
          roleNames
        );
        existingDriver.DRIVER_ROLE = roleNames
        return {
          data: existingDriver,
          Token: tokenRecord,
        };
      });
    } catch (error: any) {
      console.error("🚀 ~ registerDriver ~ error:", error);
      throw new Error(error.message);
    }
  },

  async verficationCode(data: Partial<VerficationCodeData>) {
    if (!data.CUSTOMER_CODE) {
      throw new Error("All Field are Mandatory");
    }
    const customer = await customerRepository.findOneBy({ CUSTOMER_CODE: data.CUSTOMER_CODE })
    if (!customer) {
      throw new Error("Please enter a valid code");
    }
    return "Verified Successfully"
  },

  async passwordDriver(data: Partial<PasswordDriverData>) {
    if (!data.password || !data.cpassword) {
      throw new Error("All Field are Mandatory");
    }

    if (data.password !== data.cpassword) {
      throw new Error("Passwords do not match");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const driver = await driverRepository.findOneBy({ DRIVER_ID: data.DRIVER_ID })
    if (!driver) {
      throw new Error("Driver Not Found")
    }

    const user = await userRepository.findOneBy({ USER_ID: driver.DRIVER_USERID })
    if (!user) {
      throw new Error("User Not Found");
    }

    try {
      return await AppDataSource.transaction(async (manager) => {
        const userData = {
          USER_PASSWORD: hashedPassword,
        }
        await manager.update(User, user.USER_ID, userData);

        const DriverUpadteData = {
          DRIVER_PASSWORD: hashedPassword
        }
        await driverRepository.update(driver.DRIVER_ID, DriverUpadteData);
        return "Password updated!"
      })
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error(error.message);
    }
  },

  async sendEmail(data: any) {
    const generateOTP = Math.floor(100000 + Math.random() * 900000);
    try {
      const driver = await driverRepository.findOneBy({ DRIVER_EMAIL: data.email });
      if (!driver) {
        throw new Error('Driver Not Found')
      }
      const Mail = await SendEmail(data.email, "Consense Email", `Your verification code is: ${generateOTP}`);
      if (Mail.code !== 200) {
        throw new Error(`Failed to send email: ${Mail.status}`);
      }
      const updateData = {
        DRIVER_EMAILVERFICATIONCODE: generateOTP
      }
      await driverRepository.update(driver.DRIVER_ID, updateData);
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  },

  async verifyEmail(data: any) {
    try {
      const driver = await driverRepository.findOneBy({ DRIVER_EMAIL: data.email });
      if (!driver) {
        throw new Error('Customer Not Found')
      }
      if (driver.DRIVER_EMAILVERFICATIONCODE === data.code) {
        const updateData = {
          DRIVER_EMAILVERFIED: true
        }
        await driverRepository.update(driver.DRIVER_ID, updateData);
      } else {
        throw new Error(`Verfication Code is Invalid`);
      }
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  },

  async forgotPasswordDriver(data: Partial<ForgetPasswordDriverData>) {
    try {
      const driver = await driverRepository.findOneBy({ DRIVER_EMAIL: data.DRIVER_EMAIL });
      if (!driver) {
        throw new Error('Driver Not Found')
      }
      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = Date.now() + 2 * 60 * 1000;


      const link = `${config.PASSWORD_RESET_LINK}${token}`
      console.log('link--', link)
      const mail = await SendEmail(driver.DRIVER_EMAIL, "Password reset link", `${link}. Kindly click this and create a new password.`);
      const updateData = {
        DRIVER_RESETPASSWORDTOKEN: token,
        DRIVER_RESETPASSWORDEXPIRES: String(tokenExpiry)
      }
      await driverRepository.update(driver.DRIVER_ID, updateData);
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  },

  async resetPasswordDriver(data: Partial<ResetPasswordDriverData>) {
    try {
      const driver = await driverRepository.findOneBy({ DRIVER_RESETPASSWORDTOKEN: data.token });
      if (!driver) {
        throw new Error('Driver Not Found')
      }
      if (Number(driver.DRIVER_RESETPASSWORDEXPIRES) <= Date.now()) {
        throw new Error('Link has Expired')
      }
      const NewPassword = await bcrypt.hash(data.DRIVER_PASSWORD ?? '', 10);
      const updateData = {
        DRIVER_PASSWORD: NewPassword,
        DRIVER_RESETPASSWORDTOKEN: '',
        DRIVER_RESETPASSWORDEXPIRES: ''
      }
      await driverRepository.update(driver.DRIVER_ID, updateData);
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
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
        const driver = await driverRepository.findOneBy({ DRIVER_ID: decoded?.DRIVER_ID });

        if (!driver) throw new Error('Invalid driver');

        const role = await roleRepository.findOneBy({
          ROLES_NAME: In(["DRIVER", "driver", "Driver"]),
        });

        if (!role) {
          throw new Error("Role Not Found")
        }

        const userRoles = await userRoleRepository.find({
          where: { USERROLE_USERID: driver.DRIVER_USERID },
          relations: ["ROLE"],
        });

        const roleNames = userRoles.map((role) => role.ROLE?.ROLES_NAME);
        refreshedToken = generateDriverToken(driver.DRIVER_ID, roleNames)
      }

      return refreshedToken;
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  },

  async updatePassword(id: number, data: any) {
    try {
      const user = await driverRepository.findOneBy({ DRIVER_ID: id });
      if (!user) {
        throw new Error('User Not Found')
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.DRIVER_PASSWORD = hashedPassword;
      await driverRepository.update(id, user);
    } catch (error: any) {
      throw new Error(`Error in sending email or updating customer ${error.message}`);
    }
  }
};
