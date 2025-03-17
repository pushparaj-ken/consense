import { AppDataSource } from "../config/database";
import { UserRole } from '../entities/user-role.entity';

export const userRoleRepository = AppDataSource.getRepository(UserRole);
