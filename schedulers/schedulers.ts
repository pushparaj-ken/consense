import cron from "node-cron";
import { randomUUID } from "crypto";
import { kundenService } from './service/kunden-dest.service';
import { customerRepository } from '../repositories/customer.repository';
import { driverRepository } from '../repositories/driver.repository';
import { roleRepository } from '../repositories/role.repository';
import { In } from 'typeorm';
import { userRepository } from '../repositories/user.repository';
import { userRoleRepository } from '../repositories/user-role.repository';


// Function to define scheduled tasks
export async function startSchedulers() {
  cron.schedule("0 2 * * *", async () => {
    console.log("Running scheduled task at 2 AM...");
    await transferCustomerData();
    await transferDriverData();
  });
}

async function transferCustomerData() {
  try {
    console.log("Customer Initializing Source and Destination Databases...");

    const kundenRecords = await kundenService.getKundens();

    if (kundenRecords.length === 0) {
      console.log("No Customer records found to transfer.");
      return;
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
  } catch (error: any) {
    console.error("Error during data transfer:", error);
  }
}

async function transferDriverData() {
  try {
    console.log("Driver Initializing Source and Destination Databases...");

    const [roleDriver] = await Promise.all([
      roleRepository.findOneBy({ ROLES_NAME: In(["DRIVER", "driver", "Driver"]) }),
    ]);

    if (!roleDriver) throw new Error("Role Not Found");

    const customerIds = await kundenService.getCustomerIds();

    const fahrerReocrds = await kundenService.getFahrer(customerIds);

    if (fahrerReocrds.length === 0) {
      console.log("No Driver records found to transfer.");
      return;
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
  } catch (error: any) {
    console.error("Error during data transfer:", error);
  }
}

function generateEmail(name?: string, type?: number): string {
  let cleanedName = name ? name.replace(/\s+/g, "") : "";

  let randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

  let shortUUID = randomUUID().replace(/-/g, "").substring(0, 4);

  if (!cleanedName && type == 0) {
    cleanedName = "customer";
  } else if (!cleanedName && type == 1) {
    cleanedName = "driver";
  }

  return `${cleanedName}${randomNumber}${shortUUID}@example.com`.toLowerCase();
}