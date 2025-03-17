import express from "express";
import { vehicleController } from "../../controllers/admin/vehicle.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post('/add', authenticateAdmin, vehicleController.createVehicle)

router.get('/list', authenticateAdmin, vehicleController.getVehicles)

router.get("/:id", authenticateAdmin, vehicleController.getVehicleById);

router.put('/update/:id', authenticateAdmin, vehicleController.updateVehicle)

router.delete('/delete/:id', authenticateAdmin, vehicleController.deleteVehicle)

export default router;
