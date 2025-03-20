import express from "express";
import { driverController } from "../../controllers/admin/driver.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post('/add', authenticateAdmin, driverController.createDriver)

router.get('/list', authenticateAdmin, driverController.getDrivers)

router.get("/:id", authenticateAdmin, driverController.getDriverById);

router.put('/update/:id', authenticateAdmin, driverController.updateDriver)

router.delete('/delete/:id', authenticateAdmin, driverController.deleteDriver)

router.post('/sendemail', authenticateAdmin, driverController.SendEmail)

router.post('/verifyemail', authenticateAdmin, driverController.VerifyEmail)

router.put('/updatepassword', authenticateAdmin, driverController.UpdatePassword)

export default router;
