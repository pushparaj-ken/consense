import { AppDataSource } from "../config/database";
import { Driver } from '../entities/driver.entity';

export const driverRepository = AppDataSource.getRepository(Driver);
