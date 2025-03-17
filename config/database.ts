import 'reflect-metadata';
import { DataSource } from "typeorm";
import { config } from "./constants";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: config.DB_HOST,
  port: parseInt(process.env.DB_PORT || "1433"),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  synchronize: true,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
