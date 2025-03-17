import express from "express";
import { customersController } from "../../controllers/admin/customers.controller";
import { authenticateAdmin } from '../../libs/middleware/authenticate';

const router = express.Router();

router.post('/add', authenticateAdmin, customersController.createCustomer)

router.get('/list', authenticateAdmin, customersController.getCustomers)

router.get("/:id", authenticateAdmin, customersController.getCustomerById);

router.put('/update/:id', authenticateAdmin, customersController.updateCustomer)

router.delete('/delete/:id', authenticateAdmin, customersController.deleteCustomer)

export default router;
