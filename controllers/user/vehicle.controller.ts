import { Request, Response } from "express";
import { vehicleService } from "../../services/vehicle.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { claimService } from '../../services/claim.services';
import { VehicleStatus } from '../../libs/global/enum';

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
    const result: any = await vehicleService.getVehicles(limit, offset, query);
    let response = [];

    for (let each of result.vehicle) {
      let responsejson: any = { ...each };
      responsejson.CLAIM_STATUS = VehicleStatus.Delivered_Customer;
      responsejson.CLAIM_IMAGE = "https://paizatto.s3.ap-south-1.amazonaws.com/grafik8f29dc91-09d7-4a76-baab-6e493a7f48b8.png";
      response.push(responsejson);
    }

    return {
      vehicle: response,
      pagination: {
        totalItems: result.totalItems,
        totalPages: Math.ceil(result.totalItems / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }),

  kiloMeter: asyncHandler(async (req: CustomRequest) => {
    const values = req.body;
    const driver = req.driver;

    if (values) {
      return "Data Successfully Added";
    }
  }),
};
