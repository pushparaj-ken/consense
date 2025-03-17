import express from "express";
import { vehicleController } from "../../controllers/user/vehicle.controller";
import { authenticateDriver } from '../../libs/middleware/authenticate';

const router = express.Router();

router.get('/list', authenticateDriver, vehicleController.getVehicles)

export default router;