import express from "express";
import { locationController } from "../../controllers/fleet/location.controller";
import { authenticateDriver } from '../../libs/middleware/authenticate';

const router = express.Router();

router.get('/getlocation', authenticateDriver, locationController.LocationDetails);



export default router;