import express from "express";
import { bookingController } from "../../controllers/fleet/booking.controller";
import { authenticateDriver } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post('/book', authenticateDriver, bookingController.userBooking)

router.put('/update/:id', authenticateDriver, bookingController.updateBooking)

router.delete('/delete/:id', authenticateDriver, bookingController.DeleteBooking)

router.get('/list', authenticateDriver, bookingController.ListBooking)

router.get('/availability', authenticateDriver, bookingController.Availability)

router.post('/updatereturn', authenticateDriver, bookingController.returnVehicle)

export default router;