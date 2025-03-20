import { Booking } from '../entities/booking.entity';
import { bookingRepository } from "../repositories/booking.repository";

export const bookingService = {

  async createBooking(data: Partial<Booking>) {
    return await bookingRepository.save(data);
  },

  async getBookings(limit: number, offset: number, query: any) {
    const [customers, totalItems] = await bookingRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { customers, totalItems };
  },

  async getBookingById(BOOKING_ID: number) {
    return await bookingRepository.findOneBy({ BOOKING_ID });
  },

  async updateBooking(BOOKING_ID: number, data: Partial<Booking>) {
    await bookingRepository.update(BOOKING_ID, data);
    return await bookingRepository.findOneBy({ BOOKING_ID });
  },

  async deleteBooking(id: number, data: Partial<Booking>) {
    return await bookingRepository.update(id, data);
    //return await bookingRepository.delete(id);
  },

  async getBooking(where: any) {
    return await bookingRepository.findOneBy(where);
  },
};
