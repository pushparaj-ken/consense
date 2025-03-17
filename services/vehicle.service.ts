import { vehicleRepository, VehicleDetailRepository } from "../repositories/vehicle.repository";
import { Vehicle, VehicleDetail } from '../entities/vehicle.entity';
import { AppDataSource } from '../config/database';

export const vehicleService = {

  async createVehicle(data: any) {
    try {
      return await AppDataSource.transaction(async (manager) => {
        const vehicleData = {
          VEHICLE_CUSTOMERID: data.VEHICLE_CUSTOMERID,
          VEHICLE_DRIVERID: data.VEHICLE_DRIVERID,
          VEHICLE_NAME: data.VEHICLE_NAME,
          VEHICLE_VIN: data.VEHICLE_VIN ?? null,
          VEHICLE_REGISTRATIONNO: data.VEHICLE_REGISTRATIONNO ?? null,
          VEHICLE_MAKE: data.VEHICLE_MAKE ?? null,
          VEHICLE_MODEL: data.VEHICLE_MODEL ?? null,
          VEHICLE_YEAR: data.VEHICLE_YEAR ?? null,
          VEHICLE_COLOR: data.VEHICLE_COLOR ?? null,
          VEHICLE_TYPE: data.VEHICLE_TYPE ?? null,
          VEHICLE_CAPACITY: data.VEHICLE_CAPACITY ?? null,
          VEHICLE_FUELTYPE: data.VEHICLE_FUELTYPE ?? null,
          VEHICLE_ENGINENO: data.VEHICLE_ENGINENO ?? null,
          VEHICLE_CREATEDBY: data.VEHICLE_CREATEDBY ?? null,
          VEHICLE_CREATEDON: data.VEHICLE_CREATEDON ?? null
        }
        let vehicle = await manager.save(Vehicle, vehicleData);
        const vehicleDetailsData = {
          VEHICLEDETAIL_VEHICLEID: vehicle.VEHICLE_ID,
          VEHICLEDETAIL_LASTMAINTENANCEDATE: data.VEHICLEDETAIL_LASTMAINTENANCEDATE ?? null,
          VEHICLEDETAIL_NEXTMAINTENANCEDATE: data.VEHICLEDETAIL_NEXTMAINTENANCEDATE ?? null,
          VEHICLEDETAIL_INSURANCEPOLICYNO: data.VEHICLEDETAIL_INSURANCEPOLICYNO ?? null,
          VEHICLEDETAIL_INSURANCEEXPIARYDATE: data.VEHICLEDETAIL_INSURANCEEXPIARYDATE ?? null,
          VEHICLEDETAIL_REGISTRATIONEXPIARYDATE: data.VEHICLEDETAIL_REGISTRATIONEXPIARYDATE ?? null,
          VEHICLEDETAIL_INSECPTIONEXPIARYDATE: data.VEHICLEDETAIL_INSECPTIONEXPIARYDATE ?? null
        }
        return await VehicleDetailRepository.save(vehicleDetailsData);
      });
    } catch (error: any) {
      console.log("🚀 ~ createUser ~ error:", error)
      throw new Error("Failed to create user and assign role");
    }
  },

  async getVehicles(limit: number, offset: number, query: any) {
    const [vehicle, totalItems] = await vehicleRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });
    return { vehicle, totalItems };
  },

  async getVehicleById(VEHICLE_ID: number) {
    return await vehicleRepository.findOneBy({ VEHICLE_ID });
  },

  async updateVehicle(VEHICLE_ID: number, data: Partial<Vehicle>) {
    await vehicleRepository.update(VEHICLE_ID, data);
    return await vehicleRepository.findOneBy({ VEHICLE_ID });
  },

  async deleteVehicle(id: number, data: Partial<Vehicle>) {
    return await vehicleRepository.update(id, data);
  },
};
