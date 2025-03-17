import express from "express";
import { driverController } from "../../controllers/user/driver.controller";
import { authenticateDriver } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post("/login", driverController.Login);

router.post('/register', driverController.Register);

router.post('/verify', driverController.VerficationCode);

router.post('/forgotPassword', driverController.ForgotPassword)

router.put('/resetPassword/:token', driverController.ResetPassword)

router.put('/password', authenticateDriver, driverController.Password)

router.post('/sendemail', authenticateDriver, driverController.SendEmail)

router.put('/verifyemail', authenticateDriver, driverController.VerifyEmail)

router.get('/profile', authenticateDriver, driverController.driverProfile)

router.put('/updateprofile', authenticateDriver, driverController.UpdateDriverProfile)

router.post('/refresh-token', driverController.refreshTokenDriver)

export default router;