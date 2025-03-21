import { locationService } from "../../services/location.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';
import { locationRepository } from '../../repositories/location.repository';

export const locationController = {
  createLocation: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const createData = {
      ...value,
      LOCATION_CREATEDBY: admin.USER_ID,
      LOCATION_CREATEDON: new Date()
    }
    return await locationService.createLocation(createData);
  }),

  getLocations: asyncHandler(async (req: CustomRequest) => {
    const value = req.query;
    let conditions: string[] = [];

    if (value.type) {
      conditions.push(`LOCATION_TYPE = '${Number(value.type)}'`);
    }
    if (value.status) {
      conditions.push(`LOCATION_STATUS = '${Number(value.status)}'`);
    }
    if (value.name) {
      conditions.push(`LOCATION_NAME LIKE '%${value.name}%'`);
    }
    if (value.id) {
      conditions.push(`LOCATION_ID = '${Number(value.id)}'`);
    }
    if (value.LOCATION_CUSTOMERID) {
      conditions.push(`LOCATION_CUSTOMERID = '${Number(value.LOCATION_CUSTOMERID)}'`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `SELECT * FROM CFCM_LOCATION ${whereClause}`;

    return await locationRepository.query(query);
  }),

  getLocationById: asyncHandler(async (req: CustomRequest) => {
    const location = await locationService.getLocationById(Number(req.params.id));
    if (!location) throw new Error("Location not found");
    return location;
  }),

  updateLocation: asyncHandler(async (req: CustomRequest) => {
    const value = req.body;
    const admin = req.admin;
    const updateData = {
      ...value,
      LOCATION_MODIFIEDBY: admin.USER_ID,
      LOCATION_MODIFIEDON: new Date()
    }
    const updatedLocation = await locationService.updateLocation(Number(req.params.id), updateData);
    if (!updatedLocation) throw new Error("Location not found");
    return updatedLocation;
  }),

  deleteLocation: asyncHandler(async (req: CustomRequest) => {
    const admin = req.admin;
    const location = await locationService.getLocationById(Number(req.params.id));
    if (!location) throw new Error("Location not found");
    const deleteData = {
      LOCATION_STATUS: 1,
      LOCATION_MODIFIEDBY: admin.USER_ID,
      LOCATION_MODIFIEDON: new Date()
    }
    return await locationService.deleteLocation(Number(req.params.id), deleteData);
  }),
};
