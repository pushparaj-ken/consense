import { MoreThan, Not } from 'typeorm';
import { DestDataSource } from "../../config/database";
import { customerRepository } from '../../repositories/customer.repository';
import { Kunden } from "../entity-dest/kunden.entity";
import { Fahrer } from '../entity-dest/fahrer.entity';
import { driverRepository } from '../../repositories/driver.repository';

export const kundenService = {
  async initializeDB() {
    if (!DestDataSource.isInitialized) {
      await DestDataSource.initialize();
    }
  },

  async getKundens() {
    await this.initializeDB();
    const kundenRepo = DestDataSource.getRepository(Kunden);
    const lastProcessed = await customerRepository.findOne({
      where: { CUSTOMER_DUPICATEID: Not(0) },
      select: ["CUSTOMER_DUPICATEID"],
      order: { CUSTOMER_DUPICATEID: "DESC" },
    });
    const lastProcessedId = lastProcessed ? lastProcessed.CUSTOMER_DUPICATEID : 0;
    return await kundenRepo.find({
      where: {
        TenantItemId: MoreThan(lastProcessedId)
      },
      order: { TenantItemId: "ASC" },
    });
  },

  async getFahrer(customerId: number[]) {
    await this.initializeDB();
    const fahrerRepo = DestDataSource.getRepository(Fahrer);
    const lastDriverProcessed = await driverRepository.findOne({
      where: { DRIVER_DUPICATEID: Not(0) },
      select: ["DRIVER_DUPICATEID"],
      order: { DRIVER_DUPICATEID: "DESC" },
    });
    const lastProcessedId = lastDriverProcessed ? lastDriverProcessed.DRIVER_DUPICATEID : 0;

    const record = await fahrerRepo.query(`SELECT f.FahrerId AS DRIVER_ID,f.KundeTenantItemId AS CUSTOMER_ID,f.Vorname AS FIRSTNAME,f.Nachname AS LASTNAME,a.AdresseId ,a.Emailadresse AS EMAIL,a.Mobilnummer AS PHONENO,a.Strasse AS STREET,a.Plz AS ZIPCODE,a.Ort AS CITY,a.Land AS COUNTRY FROM Fahrer AS f LEFT JOIN Adresse AS a ON a.FahrerId=f.FahrerId WHERE f.FahrerId > ${lastProcessedId} AND f.KundeTenantItemId IN (${customerId}) AND a.IstAktiv=1 AND f.IstAktiv=1 ORDER BY f.FahrerId OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY`);
    if (!record || record.length === 0) {
      console.log("🚀 ~ getFahrer ~ No Fahrer found for customerId:", customerId);
      return null;
    }
    return record;
  },

  async getCustomerIds() {
    const customer = await customerRepository.find({
      where: { CUSTOMER_DUPICATEID: Not(0) },
      select: ["CUSTOMER_DUPICATEID"],
      order: { CUSTOMER_DUPICATEID: "DESC" },
    });

    const customerIds = customer.map(c => c.CUSTOMER_DUPICATEID);
    return customerIds;
  },
};
