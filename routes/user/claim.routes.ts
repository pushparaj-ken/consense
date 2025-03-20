import express from "express";
import { claimController } from "../../controllers/user/claim.controller";
import { authenticateDriver } from '../../libs/middleware/authenticate';

const router = express.Router();


router.post('/add', authenticateDriver, claimController.createClaim)

router.get('/list', authenticateDriver, claimController.getClaims)

export default router;