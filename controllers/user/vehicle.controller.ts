import { Request, Response } from "express";
import { vehicleService } from "../../services/vehicle.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';

export const vehicleController = {
  getVehicles: asyncHandler(async (req: CustomRequest) => {
    const values = req.query;
    const driver = req.driver;
    const page = parseInt(values.page as string) || 1;
    const limit = parseInt(values.limit as string) || 10;
    const offset = (page - 1) * limit;

    let query: any = {}
    if (values.VEHICLE_ID != '' && values.VEHICLE_ID != null && values.VEHICLE_ID != undefined) {
      query.VEHICLE_ID = values.VEHICLE_ID
    }
    query.VEHICLE_DRIVERID = driver.DRIVER_ID
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
};
