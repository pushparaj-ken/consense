import express from "express";
import { adminController } from "../../controllers/admin/admin.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post("/register", adminController.Register);

router.post("/login", adminController.Login);

router.get('/list', authenticateAdmin, adminController.getUsers)

router.get("/get/:id", authenticateAdmin, adminController.getUserById);

router.put('/update/:id', authenticateAdmin, adminController.updateUser)

router.delete('/delete/:id', authenticateAdmin, adminController.deleteUser)

router.get("/dashboard", authenticateAdmin, adminController.Dashboard);

router.get('/damagelist', authenticateAdmin, adminController.DamageList)

router.put('/updatepassword', authenticateAdmin, adminController.UpdatePassword)

router.get('/sync-customers', authenticateAdmin, adminController.SyncCustomers)

router.get('/sync-drivers', authenticateAdmin, adminController.SyncDrivers)

router.post('/refresh-token', adminController.refreshTokenDriver)

export default router;
