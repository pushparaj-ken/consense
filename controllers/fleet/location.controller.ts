import { Request, Response } from "express";
import { driverService } from "../../services/driver.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { locationRepository } from '../../repositories/location.repository';

export const locationController = {

  LocationDetails: asyncHandler(async (req: CustomRequest) => {
    const value = req.query;
    const driver = req.driver;

    let query = "";
    if (value.LOCATION_TYPE) {
      query = `AND LOCATION_TYPE = '${Number(value.LOCATION_TYPE)}'`;
    }

    if (value.LOCATION_NAME) {
      query = `AND LOCATION_NAME LIKE '%${value.LOCATION_NAME}%'`;
    }

    const result = await locationRepository.query(`SELECT * FROM CFCM_LOCATION WHERE LOCATION_STATUS=0 AND LOCATION_CUSTOMERID = ${driver.DRIVER_CUSTOMERID.CUSTOMER_ID} ${query}`);

    return result;
  }),
};
