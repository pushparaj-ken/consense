import bcrypt from 'bcrypt';
import { customersService } from "../../services/customers.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';

export const customersController = {
  createCustomer: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const code = Math.floor(10000000 + Math.random() * 90000000)
    const hashedPassword = value.CUSTOMER_PASSWORD ? await bcrypt.hash(value.CUSTOMER_PASSWORD, 10) : '';
    const createData = {
      ...value,
      CUSTOMER_CODE: code,
      CUSTOMER_PASSWORD: hashedPassword,
      CUSTOMER_CREATEDBY: admin.USER_ID,
      CUSTOMER_CREATEDON: new Date()
    }
    return await customersService.createCustomer(createData);
  }),

  getCustomers: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;

    let query: any = {}
    if (values.CUSTOMER_ID != '' && values.CUSTOMER_ID != null && values.CUSTOMER_ID != undefined) {
      query.CUSTOMER_ID = values.CUSTOMER_ID
    }
    if (values.CUSTOMER_CODE != '' && values.CUSTOMER_CODE != null && values.CUSTOMER_CODE != undefined) {
      query.CUSTOMER_CODE = values.CUSTOMER_CODE
    }
    query.CUSTOMER_STATUS = 0
    const result = await customersService.getCustomers(limit, offset, query);

    return {
      customers: result.customers,
      pagination: {
        totalItems: result.totalItems,
        totalPages: Math.ceil(result.totalItems / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }),

  getCustomerById: asyncHandler(async (req: CustomRequest) => {
    const role = await customersService.getCustomerById(Number(req.params.id));
    if (!role) throw new Error("Customer not found");
    return role;
  }),

  updateCustomer: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const updateData = {
      ...value,
      CUSTOMER_MODIFIEDBY: admin.USER_ID,
      CUSTOMER_MODIFIEDON: new Date()
    }
    const updatedCustomer = await customersService.updateCustomer(Number(req.params.id), updateData);
    if (!updatedCustomer) throw new Error("Customer not found");
    return updatedCustomer;
  }),

  deleteCustomer: asyncHandler(async (req: CustomRequest) => {
    const admin = req.admin;
    const deleteData = {
      CUSTOMER_STATUS: 1,
      CUSTOMER_MODIFIEDBY: admin.USER_ID,
      CUSTOMER_MODIFIEDON: new Date()
    }
    const customer = await customersService.getCustomerById(Number(req.params.id));
    if (!customer) throw new Error("Customer not found");
    return await customersService.deleteCustomer(Number(req.params.id), deleteData);
  }),
};
