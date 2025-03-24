import { AppDataSource } from '../config/database';
import { Booking, BookingPassenger } from '../entities/booking.entity';
import { bookingRepository } from "../repositories/booking.repository";

export const bookingService = {

  async createBooking(data: Partial<any>) {
    try {
      return await AppDataSource.transaction(async (manager) => {
        const bookingData = {
          BOOKING_DRIVERID: data.BOOKING_DRIVERID,
          BOOKING_VEHICLEID: data.BOOKING_VEHICLEID,
          BOOKING_STARTDATE: data.BOOKING_STARTDATE,
          BOOKING_ENDDATE: data.BOOKING_ENDDATE,
          BOOKING_COSTCENTER: data.generalInformation.BOOKING_COSTCENTER,
          BOOKING_TRAVELREASON: data.generalInformation.BOOKING_TRAVELREASON,
          BOOKING_DEPARTMENT: data.generalInformation.BOOKING_DEPARTMENT,
          BOOKING_PROJECT: data.generalInformation.BOOKING_PROJECT,
          BOOKING_LICENSENO: data.licenseDetails.BOOKING_LICENSENO,
          BOOKING_LICENSEVEHICLECLASS: data.licenseDetails.BOOKING_LICENSEVEHICLECLASS,
          BOOKING_LICENSEDATEOFISSUE: data.licenseDetails.BOOKING_LICENSEDATEOFISSUE,
          BOOKING_LICENSEEXPIRYDATE: data.licenseDetails.BOOKING_LICENSEEXPIRYDATE,
          BOOKING_LICENSECOUNTRYISSUE: data.licenseDetails.BOOKING_LICENSECOUNTRYISSUE,
          BOOKING_LICENSEPLACEOFISSUE: data.licenseDetails.BOOKING_LICENSEPLACEOFISSUE,
          BOOKING_CREATEDBY: data.BOOKING_CREATEDBY,
          BOOKING_CREATEDON: data.BOOKING_CREATEDON
        }
        let booking: any = await manager.save(Booking, bookingData);
        for (let each of data.passenger) {
          const bookingPassengerData = {
            BOOKINGPASSENGER_BOOKINGID: booking.BOOKING_ID,
            BOOKINGPASSENGER_FIRSTNAME: each.BOOKINGPASSENGER_FIRSTNAME,
            BOOKINGPASSENGER_LASTNAME: each.BOOKINGPASSENGER_LASTNAME,
            BOOKINGPASSENGER_DEPARTMENT: each.BOOKINGPASSENGER_DEPARTMENT,
            BOOKINGPASSENGER_PROJECT: each.BOOKINGPASSENGER_PROJECT,
            BOOKINGPASSENGER_CREATEDBY: data.BOOKING_CREATEDBY,
            BOOKINGPASSENGER_CREATEDON: data.BOOKING_CREATEDON
          }
          await manager.save(BookingPassenger, bookingPassengerData);
        }
        return booking;
      });
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error("Failed to create user and assign role");
    }
  },

  async getBookings(limit: number, offset: number, query: any) {
    const [vehicle, totalItems] = await bookingRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { vehicle, totalItems };
  },

  async getBookingById(BOOKING_ID: number) {
    return await bookingRepository.findOneBy({ BOOKING_ID });
  },

  async updateBooking(BOOKING_ID: number, data: Partial<any>) {
    try {
      return await AppDataSource.transaction(async (manager) => {

        let booking = await manager.findOne(Booking, {
          where: { BOOKING_ID: BOOKING_ID },
          relations: ["passengers"],
        });

        if (!booking) {
          throw new Error("Booking not found");
        }

        const updatedBookingData = {
          BOOKING_STARTDATE: data.BOOKING_STARTDATE ?? booking.BOOKING_STARTDATE,
          BOOKING_ENDDATE: data.BOOKING_ENDDATE ?? booking.BOOKING_ENDDATE,
          BOOKING_COSTCENTER: data.generalInformation?.BOOKING_COSTCENTER ?? booking.BOOKING_COSTCENTER,
          BOOKING_TRAVELREASON: data.generalInformation?.BOOKING_TRAVELREASON ?? booking.BOOKING_TRAVELREASON,
          BOOKING_DEPARTMENT: data.generalInformation?.BOOKING_DEPARTMENT ?? booking.BOOKING_DEPARTMENT,
          BOOKING_PROJECT: data.generalInformation?.BOOKING_PROJECT ?? booking.BOOKING_PROJECT,
          BOOKING_LICENSENO: data.licenseDetails?.BOOKING_LICENSENO ?? booking.BOOKING_LICENSENO,
          BOOKING_LICENSEVEHICLECLASS: data.licenseDetails?.BOOKING_LICENSEVEHICLECLASS ?? booking.BOOKING_LICENSEVEHICLECLASS,
          BOOKING_LICENSEDATEOFISSUE: data.licenseDetails?.BOOKING_LICENSEDATEOFISSUE ?? booking.BOOKING_LICENSEDATEOFISSUE,
          BOOKING_LICENSEEXPIRYDATE: data.licenseDetails?.BOOKING_LICENSEEXPIRYDATE ?? booking.BOOKING_LICENSEEXPIRYDATE,
          BOOKING_LICENSECOUNTRYISSUE: data.licenseDetails?.BOOKING_LICENSECOUNTRYISSUE ?? booking.BOOKING_LICENSECOUNTRYISSUE,
          BOOKING_LICENSEPLACEOFISSUE: data.licenseDetails?.BOOKING_LICENSEPLACEOFISSUE ?? booking.BOOKING_LICENSEPLACEOFISSUE,
          BOOKING_UPDATEDBY: data.BOOKING_UPDATEDBY ?? booking.BOOKING_CREATEDBY,
          BOOKING_UPDATEDON: new Date(),
        };

        booking = await manager.save(Booking, { ...booking, ...updatedBookingData });

        if (data.passenger && Array.isArray(data.passenger)) {
          await manager.delete(BookingPassenger, { BOOKINGPASSENGER_BOOKINGID: booking.BOOKING_ID });

          for (let each of data.passenger) {
            const bookingPassengerData = {
              BOOKINGPASSENGER_BOOKINGID: booking.BOOKING_ID,
              BOOKINGPASSENGER_FIRSTNAME: each.BOOKINGPASSENGER_FIRSTNAME,
              BOOKINGPASSENGER_LASTNAME: each.BOOKINGPASSENGER_LASTNAME,
              BOOKINGPASSENGER_DEPARTMENT: each.BOOKINGPASSENGER_DEPARTMENT,
              BOOKINGPASSENGER_PROJECT: each.BOOKINGPASSENGER_PROJECT,
              BOOKINGPASSENGER_CREATEDBY: data.BOOKING_UPDATEDBY,
              BOOKINGPASSENGER_CREATEDON: new Date(),
            };
            await manager.save(BookingPassenger, bookingPassengerData);
          }
        }

        return booking;
      });
    } catch (error: any) {
      console.log("🚀 ~ updateBooking ~ error:", error);
      throw new Error("Failed to update booking");
    }
  },

  async deleteBooking(id: number, data: Partial<Booking>) {
    return await bookingRepository.update(id, data);
    //return await bookingRepository.delete(id);
  },

  async getBooking(where: any) {
    return await bookingRepository.findOneBy(where);
  },
};
