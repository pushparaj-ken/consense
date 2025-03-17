import { locationService } from "../../services/location.service";
import { asyncHandler } from '../../utils/async-handler';
import { CustomRequest } from '../../libs/custom-request';

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

  getLocations: asyncHandler(async () => {
    return await locationService.getLocations();
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
