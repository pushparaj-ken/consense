import { AppDataSource } from "../config/database";
import { Customer } from '../entities/customer.entity';

export const customerRepository = AppDataSource.getRepository(Customer);
