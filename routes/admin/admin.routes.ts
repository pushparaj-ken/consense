import express from "express";
import { adminController } from "../../controllers/admin/admin.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post("/register", adminController.Register);

router.post("/login", adminController.Login);

router.get("/dashboard", authenticateAdmin, adminController.Dashboard);

router.put('/updatepassword', authenticateAdmin, adminController.UpdatePassword)

export default router;
