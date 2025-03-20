import 'reflect-metadata';
import { DataSource } from "typeorm";
import { config } from "./constants";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT || "1433"),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});


export const DestDataSource = new DataSource({
  type: "mssql",
  host: config.DEST_DB_HOST,
  port: parseInt(config.DEST_DB_PORT || "1433"),
  username: config.DEST_DB_USERNAME,
  password: config.DEST_DB_PASSWORD,
  database: config.DEST_DB_DATABASE,
  entities: [__dirname + '/../schedulers/entity-dest/*.entity.{ts,js}'],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});