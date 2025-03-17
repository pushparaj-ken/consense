import { AppDataSource } from "../config/database";
import { Location } from '../entities/location.entity';

export const locationRepository = AppDataSource.getRepository(Location);
