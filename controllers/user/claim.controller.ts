import bcrypt from 'bcrypt';
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { claimService } from '../../services/claim.services';
import { AppDataSource } from '../../config/database';
import { Claim, ClaimDocument, ClaimLog, ClaimParking, ClaimParts, ClaimParty, ClaimPolice } from '../../entities/claim.entity';
import { vehicleService } from '../../services/vehicle.service';
import { claimLogRepository, claimRepository } from '../../repositories/claim.repository';
import { vehicleRepository } from '../../repositories/vehicle.repository';
import { response } from 'express';
import { DamageStatus, VehicleStatus } from '../../libs/global/enum';

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

        const claimLog = {
          CLAIMLOG_CLAIMID: claim.CLAIM_ID,
          CLAIMLOG_DATE: new Date(),
          CLAIMLOG_REPORTDATE: new Date(),
          CLAIMLOG_STAGE: DamageStatus.Report_generated
        }

        await manager.save(ClaimLog, claimLog);

        return claim;
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
      if (values.vehicleId == null && values.vehicleId == '' && values.vehicleId == undefined) {
        throw new Error("All fields are mandatory");
      }

      let query: any = {};
      if (values.damageNo) {
        query.CLAIM_NO = values.damageNo;
      }
      const vehicleRecord = await vehicleRepository.findOneBy({ VEHICLE_DRIVERID: driver.DRIVER_ID });

      if (!vehicleRecord) {
        throw new Error("Vehicle not Found")
      }
      const claims: any = [];
      let responsejson: any = {}
      responsejson.VEHICLE_NAME = vehicleRecord?.VEHICLE_NAME ?? "";
      responsejson.VEHICLE_VIN = vehicleRecord?.VEHICLE_VIN ?? "";
      responsejson.VEHICLE_ENGINENO = vehicleRecord?.VEHICLE_ENGINENO ?? "";
      responsejson.VEHICLE_MODEL = vehicleRecord?.VEHICLE_MODEL ?? "";
      responsejson.VEHICLE_YEAR = vehicleRecord?.VEHICLE_YEAR ?? "";
      responsejson.VEHICLE_COLOR = vehicleRecord?.VEHICLE_COLOR ?? "";
      responsejson.VEHICLE_TYPE = vehicleRecord?.VEHICLE_TYPE ?? "";
      responsejson.VEHICLE_STATUS = VehicleStatus.Delivered_Customer ?? "";
      responsejson.IMAGE = "https://paizatto.s3.ap-south-1.amazonaws.com/grafik8f29dc91-09d7-4a76-baab-6e493a7f48b8.png";

      query.CLAIM_VEHICLEID = vehicleRecord.VEHICLE_ID;

      const claimRecord = await claimRepository.find({ where: query })
      let subresponsejsonDetails = []
      if (claimRecord.length > 0) {
        for (const row of claimRecord) {
          let subresponsejson: any = {}
          subresponsejson.CLAIM_ID = row.CLAIM_ID;
          subresponsejson.CLAIM_TYPE = row.CLAIM_TYPE;
          subresponsejson.CLAIM_STAGE = row.CLAIM_STAGE;
          subresponsejson.CLAIM_NO = row.CLAIM_NO

          const claimLog = await claimLogRepository.find({ where: { CLAIMLOG_CLAIMID: row.CLAIM_ID } })
          let childresponseDetails = []
          if (claimLog.length > 0) {
            for (const each of claimLog) {
              let childresponsejson: any = {}
              childresponsejson.REPAIR_STATUS = each.CLAIMLOG_STAGE;
              childresponsejson.REPAIR_DATE = each.CLAIMLOG_DATE;
              childresponseDetails.push(childresponsejson)
            }
          }
          subresponsejson.STATUS = childresponseDetails
          subresponsejsonDetails.push(subresponsejson)
        };
      }
      responsejson.Reports = subresponsejsonDetails
      claims.push(responsejson)

      return claims
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error(error);
    }
  }),
};
