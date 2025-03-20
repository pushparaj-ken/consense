import { Request, Response } from "express";
import { bookingService } from "../../services/booking.services";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { bookingRepository } from '../../repositories/booking.repository';
import { vehicleService } from '../../services/vehicle.service';

export const bookingController = {

  userBooking: asyncHandler(async (req: CustomRequest, res: Response) => {
    const values = req.body;
    const fleet = req.driver;
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);
    const vehicleId = values.vehicleId;

    const vehicleRecord = await vehicleService.getVehicleById(vehicleId);

    if (!vehicleRecord) {
      throw new Error("Vehicle not Found")
    }

    const checkBookings = await bookingRepository.query(`SELECT * FROM CFCM_BOOKING WHERE BOOKING_STARTDATE >='${startDate}' AND BOOKING_ENDDATE <= '${endDate}' AND BOOKING_VEHICLEID='${vehicleId}'`);

    if (checkBookings) {
      throw new Error('Vehicle has been Already booked!');
    }

    let Data: any = {}
    Data = values;
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
    const sort = values.sort ?? 'BOOKING_STARTDATE ASC';

    const startDate = values.startDate ? new Date(String(values.startDate)) : null;
    const endDate = values.endDate ? new Date(String(values.endDate)) : null;

    let queryConditions: string[] = [];
    let queryParams: any[] = [];

    // Booking ID filter
    if (values.BOOKING_ID) {
      queryConditions.push("BOOKING_ID = ?");
      queryParams.push(values.BOOKING_ID);
    }

    queryConditions.push("BOOKING_STATUS = ?");
    queryParams.push(0);

    if (startDate && endDate) {
      queryConditions.push("BOOKING_STARTDATE >= ? AND BOOKING_ENDDATE <= ?");
      queryParams.push(startDate, endDate);
    }

    const whereClause = queryConditions.length > 0 ? `WHERE ${queryConditions.join(" AND ")}` : "";

    const sqlQuery = `
    SELECT * FROM CFCM_BOOKING 
    ${whereClause}
    ORDER BY ${sort} 
    LIMIT ? OFFSET ?`;

    queryParams.push(limit, offset);

    const checkBookings = await bookingRepository.query(sqlQuery, queryParams);

    if (checkBookings) {
      throw new Error('Vehicle has been Already booked!');
    }

    return checkBookings;
  }),

  returnVehicle: asyncHandler(async (req: CustomRequest, res: Response) => {
    const values = req.body;
    const params = req.params
    const driver = req.driver;

    const vehicleId = values.vehicleId;

    const vehicleRecord = await vehicleService.getVehicleById(vehicleId);

    if (!vehicleRecord) {
      throw new Error("Vehicle not Found")
    }

    const boooking = await bookingService.getBookingById(Number(params.id))

    if (!boooking) {
      throw new Error("Booking not Found")
    }

    const updateData = {
      BOOKING_VEHICLERETURNMILEAGE: values.BOOKING_VEHICLERETURNMILEAGE,
      BOOKING_VEHICLERETURNLOCATION: values.BOOKING_VEHICLERETURNLOCATION,
      BOOKING_VEHICLERETURNANYDAMAGE: values.BOOKING_VEHICLERETURNANYDAMAGE,
      BOOKING_MODIFIEDBY: driver.DRIVER_ID,
      BOOKING_MODIFIEDON: new Date()
    }
    const booking = await bookingService.updateBooking(Number(params.id), updateData);

    const updatevehicleData = {
      VEHICLERETURNDETAIL_VEHICLEID: vehicleId,
      VEHICLERETURNDETAIL_BOOKINGID: booking?.BOOKING_ID,
      VEHICLERETURNDETAIL_MILEAGE: values.VEHICLERETURNDETAIL_MILEAGE,
      VEHICLERETURNDETAIL_RETURNLOCATION: values.VEHICLERETURNDETAIL_RETURNLOCATION,
      VEHICLERETURNDETAIL_ANYDAMAGE: values.VEHICLERETURNDETAIL_ANYDAMAGE,
      VEHICLERETURNDETAIL_CREATEDBY: driver.DRIVER_ID,
      VEHICLERETURNDETAIL_CREATEDON: new Date()
    }

    return await vehicleService.createVehicle(updatevehicleData);
  }),
};
