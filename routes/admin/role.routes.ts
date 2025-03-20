import express from "express";
import { roleController } from "../../controllers/admin/role.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post("/", roleController.createRole);

router.get("/", authenticateAdmin, roleController.getRoles);

router.get("/:id", authenticateAdmin, roleController.getRoleById);

router.put("/:id", authenticateAdmin, roleController.updateRole);

router.delete("/:id", authenticateAdmin, roleController.deleteRole);

router.post("/assign-role", authenticateAdmin, roleController.assignRole);

export default router;
