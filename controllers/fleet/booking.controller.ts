import { Request, Response } from "express";
import { bookingService } from "../../services/booking.services";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { bookingRepository } from '../../repositories/booking.repository';
import { vehicleService } from '../../services/vehicle.service';
import { vehicleRepository } from '../../repositories/vehicle.repository';
import { AppDataSource } from '../../config/database';
import { Booking } from '../../entities/booking.entity';
import { VehicleReturnDetail } from '../../entities/vehicle.entity';

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
    const result = await bookingService.getBookings(limit, offset, query);

    return {
      customers: result.customers,
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

    const vehicle = await vehicleRepository.query(`SELECT * FROM CFCM_VEHICLE WHERE VEHICLE_STATUS = 0 ${query}`);

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
          BOOKING_VEHICLERETURNMILEAGE: String(values.BOOKING_VEHICLERETURNMILEAGE),
          BOOKING_VEHICLERETURNLOCATION: values.BOOKING_VEHICLERETURNLOCATION,
          BOOKING_VEHICLERETURNANYDAMAGE: values.BOOKING_VEHICLERETURNANYDAMAGE,
          BOOKING_MODIFIEDBY: driver.DRIVER_ID,
          BOOKING_MODIFIEDON: new Date()
        }
        await manager.update(Booking, Number(values.BOOKING_ID), updateData)

        const updatevehicleData = {
          VEHICLERETURNDETAIL_VEHICLEID: vehicleId,
          VEHICLERETURNDETAIL_BOOKINGID: Number(values.BOOKING_ID),
          VEHICLERETURNDETAIL_MILEAGE: String(values.BOOKING_VEHICLERETURNMILEAGE),
          VEHICLERETURNDETAIL_RETURNLOCATION: values.BOOKING_VEHICLERETURNLOCATION,
          VEHICLERETURNDETAIL_ANYDAMAGE: values.BOOKING_VEHICLERETURNANYDAMAGE,
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
