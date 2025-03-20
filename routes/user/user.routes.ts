import express from "express";
import { driverController } from "../../controllers/user/driver.controller";
import { authenticateDriver } from '../../libs/middleware/authenticate';
import multer from "multer";
const upload = multer({});

const router = express.Router();

router.post("/login", driverController.Login);

router.post('/register', driverController.Register);

router.post('/verify', driverController.VerficationCode);

router.post('/forgotPassword', driverController.ForgotPassword)

router.post('/resetPassword', driverController.ResetPassword)

router.put('/password', authenticateDriver, driverController.Password)

router.post('/sendemail', authenticateDriver, driverController.SendEmail)

router.put('/verifyemail', authenticateDriver, driverController.VerifyEmail)

router.get('/profile', authenticateDriver, driverController.driverProfile)

router.put('/updateprofile', authenticateDriver, driverController.UpdateDriverProfile)

router.post('/refresh-token', driverController.refreshTokenDriver)

router.post('/imageupload', authenticateDriver, upload.fields([{ name: 'image', maxCount: 1 }]), driverController.imageUpload)

router.post('/multipleupload', authenticateDriver, upload.fields([{ name: 'images', maxCount: 10 }]), driverController.multiplImageUpload)

router.get('/reset-password/:id', driverController.viewResetPassword);

export default router;