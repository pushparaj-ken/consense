import { AppDataSource } from "../config/database";
import { Booking, BookingPassenger, BookingReturn } from '../entities/booking.entity';

export const bookingRepository = AppDataSource.getRepository(Booking);

export const bookingPassengerRepository = AppDataSource.getRepository(BookingPassenger);

export const bookingReturnRepository = AppDataSource.getRepository(BookingReturn);
