import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";

export const userRepository = AppDataSource.getRepository(User);
