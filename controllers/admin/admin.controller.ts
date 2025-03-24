import { Request } from "express";
import bcrypt from 'bcrypt';
import { adminService } from "../../services/admin.service";
import { asyncHandler } from '../../utils/async-handler';
import { userService } from '../../services/user.service';
import { CustomRequest } from '../../libs/custom-request';
import { customerRepository } from '../../repositories/customer.repository';
import { driverRepository } from '../../repositories/driver.repository';
import { roleRepository } from '../../repositories/role.repository';
import { In } from 'typeorm';
import { userRepository } from '../../repositories/user.repository';
import { claimRepository } from '../../repositories/claim.repository';

export const adminController = {

  Register: asyncHandler(async (req: Request) => {
    const value = req.body;
    const existingRoles = await roleRepository.find({
      where: {
        ROLES_ID: In(value.ROLE_ID)
      }
    });
    const existingRoleIDs = existingRoles.map(role => role.ROLES_ID);


    const missingRoles = value.ROLE_ID.filter((id: number) => !existingRoleIDs.includes(id));

    if (missingRoles.length > 0) {
      throw new Error(`The following roles do not exist: ${missingRoles.join(", ")}`);
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

    // whereClause += ` AND ur.USERROLE_ROLEID = '${role.ROLES_ID}'`;


    const query = `
        SELECT u.*,STRING_AGG(ur.USERROLE_ROLEID, ',') AS ROLE_ID FROM CFCM_USERS AS u
        LEFT JOIN CFCM_USERROLE AS ur ON ur.USERROLE_USERID = u.USER_ID
        ${whereClause}
        ORDER BY u.USER_ID DESC
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    `;
    console.log("🚀 ~ getUsers:asyncHandler ~ query:", query)

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
    if (value.USER_PASSWORD) {
      value.USER_PASSWORD = await bcrypt.hash(value.USER_PASSWORD, 10)
    }
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

  DamageList: asyncHandler(async (req: CustomRequest) => {
    try {
      const values = req.query;
      let query = "";
      if (values.damageNo) {
        query = `AND c.CLAIM_NO = '${values.damageNo}'`;
      }

      if (values.driverId) {
        query = `AND c.CLAIM_DRIVERID = '${values.driverId}'`;
      }

      const rawResult = await claimRepository.query(`
          SELECT 
            c.*, 
            cpr.*, 
            cpry.*, 
            cpo.*, 
            cprk.*, 
            cd.*
          FROM CFCM_CLAIM AS c 
          LEFT JOIN CFCM_CLAIMPARTS AS cpr ON cpr.CLAIMPARTS_CLAIMID = c.CLAIM_ID 
          LEFT JOIN CFCM_CLAIMPARTY AS cpry ON cpry.CLAIMPARTY_CLAIMID = c.CLAIM_ID 
          LEFT JOIN CFCM_CLAIMPOLICE AS cpo ON cpo.CLAIMPOLICE_CLAIMID = c.CLAIM_ID 
          LEFT JOIN CFCM_CLAIMPARKING AS cprk ON cprk.CLAIMPARKING_CLAIMID = c.CLAIM_ID 
          LEFT JOIN CFCM_CLAIMDOCUMENT AS cd ON cd.CLAIMDOCUMENT_CLAIMID = c.CLAIM_ID
          WHERE CLAIM_STATUS ='0' ${query}
        `);
      const claims: any = {};

      rawResult.forEach((row: any) => {
        const claimId = row.CLAIM_ID;

        if (!claims[claimId]) {
          claims[claimId] = {
            CLAIM_ID: row.CLAIM_ID,
            CLAIM_NO: row.CLAIM_NO,
            CLAIM_TYPE: row.CLAIM_TYPE,
            CLAIM_DATE: row.CLAIM_DATE,
            parts: [],
            parking: null,
            police: null,
            party: null,
            documents: []
          };
        }

        // Group parts
        if (row.CLAIMPARTS_CLAIMID) {
          claims[claimId].parts = {
            CLAIMPARTS_CLAIMID: row.CLAIMPARTS_CLAIMID,
            CLAIMPARTS_TIREFRONTLEFT: row.CLAIMPARTS_TIREFRONTLEFT,
            CLAIMPARTS_BUMPERFRONTLEFT: row.CLAIMPARTS_BUMPERFRONTLEFT,
            // Add other parts columns as needed
          };
        }

        // Assign parking
        if (row.CLAIMPARKING_CLAIMID && !claims[claimId].parking) {
          claims[claimId].parking = {
            CLAIMPARKING_ID: row.CLAIMPARKING_ID,
            CLAIMPARKING_CLAIMID: row.CLAIMPARKING_CLAIMID,
            CLAIMPOLICE_ADDRESS1: row.CLAIMPOLICE_ADDRESS1,
            CLAIMPOLICE_ZIPCODE: row.CLAIMPOLICE_ZIPCODE,
          };
        }

        // Assign police
        if (row.CLAIMPOLICE_CLAIMID && !claims[claimId].police) {
          claims[claimId].police = {
            CLAIMPOLICE_ID: row.CLAIMPOLICE_ID,
            CLAIMPOLICE_INVESTIGATIONFILENO: row.CLAIMPOLICE_INVESTIGATIONFILENO,
            CLAIMPOLICE_DIARYNUMBER: row.CLAIMPOLICE_DIARYNUMBER,
          };
        }

        // Assign party
        if (row.CLAIMPARTY_CLAIMID && !claims[claimId].party) {
          claims[claimId].party = {
            CLAIMPARTY_ID: row.CLAIMPARTY_ID,
            CLAIMPARTY_NAME: row.CLAIMPARTY_NAME,
            CLAIMPARTY_EMAIL: row.CLAIMPARTY_EMAIL,
            CLAIMPARTY_PHONENO1: row.CLAIMPARTY_PHONENO1,
          };
        }

        // Group documents
        if (row.CLAIMDOCUMENT_CLAIMID) {
          claims[claimId].documents.push({
            CLAIMDOCUMENT_ID: row.CLAIMDOCUMENT_ID,
            CLAIMDOCUMENT_TYPE: row.CLAIMDOCUMENT_TYPE,
            CLAIMDOCUMENT_FILE1: row.CLAIMDOCUMENT_FILE1,
            CLAIMDOCUMENT_FILE2: row.CLAIMDOCUMENT_FILE2,
            CLAIMDOCUMENT_FILE3: row.CLAIMDOCUMENT_FILE3,
          });
        }
      });

      const finalClaims = Object.values(claims);

      return finalClaims
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error(error);
    }

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
