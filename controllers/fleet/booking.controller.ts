import { Request, Response } from "express";
import { bookingService } from "../../services/booking.services";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { bookingPassengerRepository, bookingRepository } from '../../repositories/booking.repository';
import { vehicleService } from '../../services/vehicle.service';
import { vehicleRepository } from '../../repositories/vehicle.repository';
import { AppDataSource } from '../../config/database';
import { Booking } from '../../entities/booking.entity';
import { VehicleReturnDetail } from '../../entities/vehicle.entity';
import { AnyError } from 'typeorm';

export const bookingController = {

  userBooking: asyncHandler(async (req: CustomRequest, res: Response) => {
    const values = req.body;
    const fleet = req.driver;
    const vehicleId = values.BOOKING_VEHICLEID;

    const vehicleRecord = await vehicleService.getVehicleById(vehicleId);

    if (!vehicleRecord) {
      throw new Error("Vehicle not Found")
    }

    const checkBookings = await bookingRepository.query(`SELECT * FROM CFCM_BOOKING WHERE BOOKING_STARTDATE >='${values.BOOKING_STARTDATE}' AND BOOKING_ENDDATE <= '${values.BOOKING_ENDDATE}' AND BOOKING_VEHICLEID='${vehicleId}'`);


    if (checkBookings.length > 0) {
      throw new Error('Vehicle has been Already booked!');
    }

    let Data: any = {}
    Data = values;
    Data.BOOKING_DRIVERID = fleet.DRIVER_ID
    Data.BOOKING_CREATEDBY = fleet.DRIVER_ID
    Data.BOOKING_CREATEDON = new Date()

    const Result = await bookingService.createBooking(Data)
    return {
      booking: Result,
      vehicleDetails: vehicleRecord,
      icon: "https://consense.s3.us-east-1.amazonaws.com/common_image/WhatsApp%20Image%202024-08-20%20at%206e4634a3b-a1b7-422c-8aaf-f95fa8db4f2c.34.15%20PM.jpeg",
    };
  }),

  updateBooking: asyncHandler(async (req: CustomRequest, res: Response) => {
    const values = req.body;
    const params = req.params
    const driver = req.driver;
    const boooking = await bookingService.getBookingById(Number(params.id))

    if (!boooking) {
      throw new Error("Booking not Found")
    }

    const updateData = {
      ...values,
      BOOKING_MODIFIEDBY: driver.DRIVER_ID,
      BOOKING_MODIFIEDON: new Date()
    }
    return await bookingService.updateBooking(Number(params.id), updateData);
  }),

  DeleteBooking: asyncHandler(async (req: CustomRequest, res: Response) => {
    const values = req.body;
    const params = req.params
    const driver = req.driver;

    const boooking = await bookingService.getBookingById(Number(params.id))

    if (!boooking) {
      throw new Error("Booking not Found")
    }

    const deleteData = {
      BOOKING_STATUS: 1,
      BOOKING_MODIFIEDBY: driver.DRIVER_ID,
      BOOKING_MODIFIEDON: new Date()
    }

    return await bookingService.deleteBooking(Number(params.id), deleteData);
  }),

  ListBooking: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;

    let query: any = {}
    if (values.BOOKING_ID != '' && values.BOOKING_ID != null && values.BOOKING_ID != undefined) {
      query.BOOKING_ID = values.BOOKING_ID
    }
    query.BOOKING_STATUS = 0
    const result: any = await bookingService.getBookings(limit, offset, query);

    let response: any = [];

    for (let each of result.vehicle) {
      let reponseJson: any = {}
      reponseJson.BOOKING_ID = each.BOOKING_ID;
      reponseJson.BOOKING_VEHICLEID = each.BOOKING_VEHICLEID;
      reponseJson.BOOKING_STARTDATE = each.BOOKING_STARTDATE;
      reponseJson.BOOKING_ENDDATE = each.BOOKING_ENDDATE;
      reponseJson.BOOKING_STATUS = each.BOOKING_STATUS;
      reponseJson.BOOKING_CREATEDBY = each.BOOKING_CREATEDBY;
      reponseJson.BOOKING_CREATEDON = each.BOOKING_CREATEDON;
      reponseJson.BOOKING_MODIFIEDBY = each.BOOKING_MODIFIEDBY;
      reponseJson.BOOKING_MODIFIEDON = each.BOOKING_MODIFIEDON;

      const vehicleData = await vehicleRepository.findOne({
        where: { VEHICLE_ID: each.BOOKING_VEHICLEID },
        relations: ["VEHICLE_DRIVERID"],
      });

      reponseJson.VEHICLE = {
        COMPANY: vehicleData?.VEHICLE_DRIVERID.DRIVER_COMPANYNAME,
        FIRSTNAME: vehicleData?.VEHICLE_DRIVERID.DRIVER_FIRSTNAME,
        LASTNAME: vehicleData?.VEHICLE_DRIVERID.DRIVER_LASTNAME,
        EMAIL: vehicleData?.VEHICLE_DRIVERID.DRIVER_EMAIL,
        PHONE: vehicleData?.VEHICLE_DRIVERID.DRIVER_PHONENO,
      };

      reponseJson.GENERALINFORMATION = {
        BOOKING_COSTCENTER: each.BOOKING_COSTCENTER,
        BOOKING_TRAVELREASON: each.BOOKING_TRAVELREASON,
        BOOKING_DEPARTMENT: each.BOOKING_DEPARTMENT,
        BOOKING_PROJECT: each.BOOKING_PROJECT,
      };

      const passengerData = await bookingPassengerRepository.find({ where: { BOOKINGPASSENGER_BOOKINGID: each.BOOKING_ID } })
      reponseJson.PASSENGER = passengerData;
      reponseJson.lICENSEDETAILS = {
        BOOKING_LICENSENO: each.BOOKING_LICENSENO,
        BOOKING_LICENSEVEHICLECLASS: each.BOOKING_LICENSEVEHICLECLASS,
        BOOKING_LICENSEDATEOFISSUE: each.BOOKING_LICENSEDATEOFISSUE,
        BOOKING_LICENSEEXPIRYDATE: each.BOOKING_LICENSEEXPIRYDATE,
        BOOKING_LICENSECOUNTRYISSUE: each.BOOKING_LICENSECOUNTRYISSUE,
        BOOKING_LICENSEPLACEOFISSUE: each.BOOKING_LICENSEPLACEOFISSUE,
      };
      reponseJson.VEHICLE_NUMBER = vehicleData?.VEHICLE_MAKE;
      response.push(reponseJson);
    }

    return {
      booking: response,
      pagination: {
        totalItems: result.totalItems,
        totalPages: Math.ceil(result.totalItems / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }),

  Availability: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;
    const sort = values.sort ?? 'ASC';

    const startDate = values.startDate ? new Date(String(values.startDate)) : null;
    const endDate = values.endDate ? new Date(String(values.endDate)) : null;

    const queryBuilder = bookingRepository
      .createQueryBuilder("booking")
      .where("BOOKING_STATUS = :status", { status: 0 })

    if (values.BOOKING_ID) {
      queryBuilder.andWhere("BOOKING_ID = :bookingId", { bookingId: values.BOOKING_ID });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere("BOOKING_STARTDATE >= :startDate AND BOOKING_ENDDATE <= :endDate", {
        startDate,
        endDate,
      });
    }

    const checkBookings = await queryBuilder
      .skip(offset)
      .take(limit)
      .getMany();


    const vehicleIds = checkBookings.map((booking) => booking.BOOKING_VEHICLEID);

    let query: any = ""
    if (vehicleIds.length > 0) {
      query = `AND VEHICLE_ID NOT IN (${vehicleIds})`
    }
    const icon = "https://consense.s3.us-east-1.amazonaws.com/common_image/WhatsApp%20Image%202024-08-20%20at%206e4634a3b-a1b7-422c-8aaf-f95fa8db4f2c.34.15%20PM.jpeg";

    const vehicle = await vehicleRepository.query(`SELECT *, '${icon}' AS VEHICLE_ICON FROM CFCM_VEHICLE WHERE VEHICLE_STATUS = 0 ${query}`);

    return vehicle;
  }),

  returnVehicle: asyncHandler(async (req: CustomRequest, res: Response) => {
    try {
      const values = req.body;
      const driver = req.driver;

      const vehicleId = values.BOOKING_VEHICLEID;

      const vehicleRecord = await vehicleService.getVehicleById(vehicleId);

      if (!vehicleRecord) {
        throw new Error("Vehicle not Found")
      }

      const boooking = await bookingService.getBookingById(Number(values.BOOKING_ID))

      if (!boooking) {
        throw new Error("Booking not Found")
      }
      return await AppDataSource.transaction(async (manager) => {
        const updateData = {
          BOOKINGRETURN_BOOKINGID: Number(values.BOOKING_ID),
          BOOKINGRETURN_VEHICLEMILEAGE: String(values.BOOKINGRETURN_VEHICLEMILEAGE),
          BOOKINGRETURN_VEHICLELOCATION: values.BOOKINGRETURN_VEHICLELOCATION,
          BOOKINGRETURN_VEHICLEANYDAMAGE: values.BOOKINGRETURN_VEHICLEANYDAMAGE,
          BOOKING_MODIFIEDBY: driver.DRIVER_ID,
          BOOKING_MODIFIEDON: new Date()
        }
        await manager.save(updateData)

        const updatevehicleData = {
          VEHICLERETURNDETAIL_VEHICLEID: vehicleId,
          VEHICLERETURNDETAIL_BOOKINGID: Number(values.BOOKING_ID),
          VEHICLERETURNDETAIL_MILEAGE: String(values.BOOKINGRETURN_VEHICLEMILEAGE),
          VEHICLERETURNDETAIL_RETURNLOCATION: values.BOOKINGRETURN_VEHICLELOCATION,
          VEHICLERETURNDETAIL_ANYDAMAGE: values.BOOKINGRETURN_VEHICLEANYDAMAGE,
          VEHICLERETURNDETAIL_CREATEDBY: driver.DRIVER_ID,
          VEHICLERETURNDETAIL_CREATEDON: new Date()
        }
        await manager.save(VehicleReturnDetail, updatevehicleData)
        return "Successfully updated";
      });
    } catch (error: any) {
      return error.message;
    }
  }),
};
