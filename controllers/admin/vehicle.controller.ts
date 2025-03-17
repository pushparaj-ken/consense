import { vehicleService } from "../../services/vehicle.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';

export const vehicleController = {
  createVehicle: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const code = Math.floor(10000000 + Math.random() * 90000000)
    const createData = {
      ...value,
      VEHICLE_CREATEDBY: admin.USER_ID,
      VEHICLE_CREATEDON: new Date()
    }
    return await vehicleService.createVehicle(createData);
  }),

  getVehicles: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;

    let query: any = {}
    if (values.VEHICLE_ID != '' && values.VEHICLE_ID != null && values.VEHICLE_ID != undefined) {
      query.VEHICLE_ID = values.VEHICLE_ID
    }
    query.VEHICLE_STATUS = 0
    const result = await vehicleService.getVehicles(limit, offset, query);

    return {
      vehicle: result.vehicle,
      pagination: {
        totalItems: result.totalItems,
        totalPages: Math.ceil(result.totalItems / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }),

  getVehicleById: asyncHandler(async (req: CustomRequest) => {
    const role = await vehicleService.getVehicleById(Number(req.params.id));
    if (!role) throw new Error("Vehicle not found");
    return role;
  }),

  updateVehicle: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const updateData = {
      ...value,
      VEHICLE_MODIFIEDBY: admin.USER_ID,
      VEHICLE_MODIFIEDON: new Date()
    }
    const updatedVehicle = await vehicleService.updateVehicle(Number(req.params.id), updateData);
    if (!updatedVehicle) throw new Error("Vehicle not found");
    return updatedVehicle;
  }),

  deleteVehicle: asyncHandler(async (req: CustomRequest) => {
    const admin = req.admin;
    const deleteData = {
      VEHICLE_STATUS: 1,
      VEHICLE_MODIFIEDBY: admin.USER_ID,
      VEHICLE_MODIFIEDON: new Date()
    }
    const customer = await vehicleService.getVehicleById(Number(req.params.id));
    if (!customer) throw new Error("Vehicle not found");
    return await vehicleService.deleteVehicle(Number(req.params.id), deleteData);
  }),
};
