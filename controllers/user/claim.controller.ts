import bcrypt from 'bcrypt';
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { claimService } from '../../services/claim.services';
import { AppDataSource } from '../../config/database';
import { Claim, ClaimDocument, ClaimParking, ClaimParts, ClaimParty, ClaimPolice } from '../../entities/claim.entity';
import { vehicleService } from '../../services/vehicle.service';
import { claimRepository } from '../../repositories/claim.repository';

export const claimController = {
  createClaim: asyncHandler(async (req: CustomRequest) => {
    try {
      const value = req.body;
      const driver = req.driver;

      let DamageNumber = Math.floor(Math.random() * 9000000);

      const vehicleRecord = await vehicleService.getVehicleById(value.vehicleId);

      if (!vehicleRecord) {
        throw new Error("Vehicle not Found")
      }

      return await AppDataSource.transaction(async (manager) => {

        const claimData = {
          CLAIM_VEHICLEID: value.vehicleId,
          CLAIM_TYPE: value.damageType ?? '',
          CLAIM_DESCRIPTION: value.damageDescription ?? '',
          CLAIM_DATE: value.damageDate ?? '',
          CLAIM_REPORTDATE: value.damageReportDate ?? '',
          CLAIM_ADDRESS1: value.street ?? '',
          CLAIM_ADDRESS2: value.city ?? '',
          CLAIM_ADDRESS3: value.country ?? '',
          CLAIM_ADDRESS4: value.workshopInfo ?? '',
          CLAIM_ZIPCODE: String(value.pincode) ?? '',
          CLAIM_MILEAGE: String(value.mileage) ?? '',
          CLAIM_TRIPTYPE: value.tripType ?? '',
          CLAIM_ISALCOHOL: value.isAlcohol ?? '',
          CLAIM_NO: String(DamageNumber),
          CLAIM_CUSTOMERID: driver.DRIVER_CUSTOMERID.CUSTOMER_ID,
          CLAIM_DRIVERID: driver.DRIVER_ID,
          CLAIM_CREATEDBY: driver.DRIVER_ID,
          CLAIM_CREATEDON: new Date(),
        }
        const claim = await manager.save(Claim, claimData);

        if (value.parts === "Yes") {

          const claimPartsData = {
            CLAIMPARTS_CLAIMID: claim.CLAIM_ID,
            CLAIMPARTS_TIREFRONTLEFT: value.tire_Front_Left ?? 0,
            CLAIMPARTS_HEADLIGHTFRONTLEFT: value.headlight_Front_Left ?? 0,
            CLAIMPARTS_RIMFRONTLEFT: value.rim_Front_Left ?? 0,
            CLAIMPARTS_BUMPERFRONTLEFT: value.bumper_Front_Left ?? 0,
            CLAIMPARTS_HEADLIGHTFRONTRIGHT: value.headlight_Front_Right ?? 0,
            CLAIMPARTS_RIMFRONTRIGHT: value.rim_Front_Right ?? 0,
            CLAIMPARTS_TIREFRONTRIGHT: value.tire_Front_Right ?? 0,
            CLAIMPARTS_FENDERLEFT: value.fender_Left ?? 0,
            CLAIMPARTS_SIDEMIRRORLEFT: value.side_Mirror_Left ?? 0,
            CLAIMPARTS_DOORFRONTLEFT: value.door_Front_Left ?? 0,
            CLAIMPARTS_SILLLEFT: value.sill_left ?? 0,
            CLAIMPARTS_DOORREARLEFT: value.door_rear_left ?? 0,
            CLAIMPARTS_SIDEWINDOWREARLEFT: value.side_window_rear_left ?? 0,
            CLAIMPARTS_SIDEPANELREARLEFT: driver.sidepanel_rear_left ?? 0,
            CLAIMPARTS_SIDEWINDOWFRONTLEFT: driver.side_window_front_left ?? 0,
            CLAIMPARTS_ENGINEHOOD: driver.engine_hood ?? 0,
            CLAIMPARTS_WINDSHIELD: driver.windshield ?? 0,
            CLAIMPARTS_ROOF: driver.roof ?? 0,
            CLAIMPARTS_WINDOWREAR: driver.window_rear ?? 0,
            CLAIMPARTS_TAILGATE: driver.tailgate ?? 0,
            CLAIMPARTS_SIDEWINDOWFRONTRIGHT: driver.side_window_front_right ?? 0,
            CLAIMPARTS_FENDERRIGHT: driver.fender_right ?? 0,
            CLAIMPARTS_SIDEMIRRORRIGHT: driver.side_mirror_right ?? 0,
            CLAIMPARTS_DOORFRONTRIGHT: driver.door_front_right ?? 0,
            CLAIMPARTS_SILLRIGHT: driver.sill_right ?? 0,
            CLAIMPARTS_DOORREARRIGHT: driver.door_rear_right ?? 0,
            CLAIMPARTS_SIDEWINDOWREARRIGHT: driver.side_window_rear_right ?? 0,
            CLAIMPARTS_SIDEPANELREARRIGHT: driver.side_panel_rear_right ?? 0,
            CLAIMPARTS_TIREREARLEFT: driver.tire_rear_left ?? 0,
            CLAIMPARTS_HEADLIGHTREARLEFT: driver.headlight_rear_left ?? 0,
            CLAIMPARTS_RIMREARLEFT: driver.rim_rear_left ?? 0,
            CLAIMPARTS_BUMPERREARLEFT: driver.bumper_rear_left ?? 0,
            CLAIMPARTS_HEADLIGHTREARRIGHT: driver.headlight_rear_right ?? 0,
            CLAIMPARTS_RIMREARRIGHT: driver.rim_rear_right ?? 0,
            CLAIMPARTS_TIREREARRIGHT: driver.tire_rear_right ?? 0,
            CLAIMPARTS_CREATEDBY: driver.DRIVER_ID,
            CLAIMPARTS_CREATEDON: new Date(),
          }

          await manager.save(ClaimParts, claimPartsData);
        }

        if (value.party === "Yes") {

          const claimPartyData = {
            CLAIMPARTY_CLAIMID: claim.CLAIM_ID,
            CLAIMPARTY_NAME: value.partyName,
            CLAIMPARTY_ADDRESS: value.partyAddress,
            CLAIMPARTY_COMPANY: value.partyCompany,
            CLAIMPARTY_EMAIL: value.partyEmail,
            CLAIMPARTY_PHONENO1: value.partyTelephone,
            CLAIMPARTY_INSURANCE: value.partyInsurance,
            CLAIMPARTY_INSURANCENUMBER: value.partyInsurancenumber,
            CLAIMPARTY_CREATEDBY: driver.DRIVER_ID,
            CLAIMPARTY_CREATEDON: new Date(),
          };

          await manager.save(ClaimParty, claimPartyData);
        }

        if (value.police === "Yes") {

          const claimPoliceData = {
            CLAIMPOLICE_CLAIMID: claim.CLAIM_ID,
            CLAIMPOLICE_INVESTIGATIONFILENO: value.policeInvestigationfileN,
            CLAIMPOLICE_DIARYNUMBER: value.policeDiarynumber,
            CLAIMPOLICE_DEPARTMENT: value.policeDepartment,
            CLAIMPOLICE_ADDRESS1: value.policeStreet,
            CLAIMPOLICE_ZIPCODE: value.policePincode,
            CLAIMPOLICE_ADDRESS2: value.policeCity,
            CLAIMPOLICE_CREATEDBY: driver.DRIVER_ID,
            CLAIMPOLICE_CREATEDON: new Date(),
          };

          await manager.save(ClaimPolice, claimPoliceData);
        }

        const claimParking = {
          CLAIMPARKING_CLAIMID: claim.CLAIM_ID,
          CLAIMPARKING_ADDRESS1: value.parkingStreet,
          CLAIMPARKING_ZIPCODE: value.parkingPincode,
          CLAIMPARKING_ADDRESS2: value.parkingCity,
          CLAIMPARKING_WORKSHOPINFO: value.parkingWorkshopInfo,
          CLAIMPARKING_ADDRESS3: value.parkingCountry,
          CLAIMPARKING_CREATEDBY: driver.DRIVER_ID,
          CLAIMPARKING_CREATEDON: new Date(),
        }

        await manager.save(ClaimParking, claimParking);

        const documentTypes = [
          { type: "frontViewLicencePlate", files: value.frontViewLicencePlate },
          { type: "vehicleDiagonal", files: value.vehicleDiagonal },
          { type: "damageArea", files: value.damageArea },
          { type: "detailDamageArea", files: value.detailDamageArea },
          { type: "registrationCertificate", files: value.registrationCertificate },
          { type: "speedMeterMileage", files: value.speedMeterMileage },
          { type: "otherDamageDocument", files: value.otherDamageDocument },
        ];

        for (const doc of documentTypes) {
          if (doc.files?.length) {
            const claimDocument = {
              CLAIMDOCUMENT_CLAIMID: claim.CLAIM_ID,
              CLAIMDOCUMENT_TYPE: doc.type,
              CLAIMDOCUMENT_FILE1: doc.files[0] || null,
              CLAIMDOCUMENT_FILE2: doc.files[1] || null,
              CLAIMDOCUMENT_FILE3: doc.files[2] || null,
              CLAIMDOCUMENT_CREATEDBY: driver.DRIVER_ID,
              CLAIMDOCUMENT_CREATEDON: new Date(),
            }
            await manager.save(ClaimDocument, claimDocument);
          }
        }
      });
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error(error);
    }
  }),

  getClaims: asyncHandler(async (req: CustomRequest) => {
    try {
      const values = req.query;
      const driver = req.driver;
      let query = "";
      if (values.damageNo) {
        query = `AND c.CLAIM_NO = '${values.damageNo}'`;
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
      WHERE c.CLAIM_DRIVERID = ${driver.DRIVER_ID} ${query}
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
};
