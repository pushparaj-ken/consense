import { AppDataSource } from "../config/database";
import { Role } from "../entities/role.entity";

export const roleRepository = AppDataSource.getRepository(Role);
