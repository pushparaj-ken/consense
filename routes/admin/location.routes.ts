import express from "express";
import { locationController } from "../../controllers/admin/location.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post("/", authenticateAdmin, locationController.createLocation);

router.get("/", authenticateAdmin, locationController.getLocations);

router.get("/:id", authenticateAdmin, locationController.getLocationById);

router.put("/:id", authenticateAdmin, locationController.updateLocation);

router.delete("/:id", authenticateAdmin, locationController.deleteLocation);

export default router;
