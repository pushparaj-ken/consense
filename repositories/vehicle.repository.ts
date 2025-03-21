import { AppDataSource } from "../config/database";
import { Vehicle, VehicleDetail, VehicleReturnDetail } from '../entities/vehicle.entity';

export const vehicleRepository = AppDataSource.getRepository(Vehicle);

export const VehicleDetailRepository = AppDataSource.getRepository(VehicleDetail);

export const VehicleReturnRepository = AppDataSource.getRepository(VehicleReturnDetail);
