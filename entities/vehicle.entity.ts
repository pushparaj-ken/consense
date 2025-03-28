import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Driver } from './driver.entity';

@Entity({ name: 'CFCM_VEHICLE' })
export class Vehicle {
  @PrimaryGeneratedColumn({ name: 'VEHICLE_ID' })
  VEHICLE_ID: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "VEHICLE_CUSTOMERID" })
  VEHICLE_CUSTOMERID: Customer;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: "VEHICLE_DRIVERID" })
  VEHICLE_DRIVERID: Driver;

  @Column({ name: 'VEHICLE_NAME', type: 'varchar', length: 255 })
  VEHICLE_NAME: string;

  @Column({ name: 'VEHICLE_VIN', type: 'varchar', length: 255 })
  VEHICLE_VIN: string;

  @Column({ name: 'VEHICLE_REGISTRATIONNO', type: 'varchar', length: 255 })
  VEHICLE_REGISTRATIONNO: string;

  @Column({ name: 'VEHICLE_MAKE', type: 'varchar', length: 255, nullable: true })
  VEHICLE_MAKE?: string;

  @Column({ name: 'VEHICLE_MODEL', type: 'varchar', length: 255, nullable: true })
  VEHICLE_MODEL?: string;

  @Column({ name: 'VEHICLE_YEAR', type: 'varchar', length: 100, nullable: true })
  VEHICLE_YEAR?: string;

  @Column({ name: 'VEHICLE_COLOR', type: 'varchar', length: 255, nullable: true })
  VEHICLE_COLOR?: string;

  @Column({ name: 'VEHICLE_TYPE', type: 'varchar', length: 255, nullable: true })
  VEHICLE_TYPE?: string;

  @Column({ name: 'VEHICLE_CAPACITY', type: 'varchar', length: 255, nullable: true })
  VEHICLE_CAPACITY?: string;

  @Column({ name: 'VEHICLE_FUELTYPE', type: 'varchar', length: 255, nullable: true })
  VEHICLE_FUELTYPE?: string;

  @Column({ name: 'VEHICLE_ENGINENO', type: 'varchar', length: 255, nullable: true })
  VEHICLE_ENGINENO?: string;

  @Column({ name: 'VEHICLE_STATUS', type: 'int', default: 0 })
  VEHICLE_STATUS: number;

  @Column({ name: 'VEHICLE_CREATEDBY', type: 'int', nullable: true })
  VEHICLE_CREATEDBY?: number;

  @Column({ name: 'VEHICLE_CREATEDON', type: 'datetime', nullable: true })
  VEHICLE_CREATEDON?: Date;

  @Column({ name: 'VEHICLE_MODIFIEDBY', type: 'int', nullable: true })
  VEHICLE_MODIFIEDBY?: number;

  @Column({ name: 'VEHICLE_MODIFIEDON', type: 'datetime', nullable: true })
  VEHICLE_MODIFIEDON?: Date;
}

@Entity({ name: 'CFCM_VEHICLEDETAIL' })
export class VehicleDetail {
  @PrimaryGeneratedColumn({ name: 'VEHICLEDETAIL_ID' })
  VEHICLEDETAIL_ID: number;

  @Column({ name: 'VEHICLEDETAIL_VEHICLEID', type: 'int' })
  VEHICLEDETAIL_VEHICLEID: number;

  @Column({ name: 'VEHICLEDETAIL_LASTMAINTENANCEDATE', type: 'datetime', nullable: true })
  VEHICLEDETAIL_LASTMAINTENANCEDATE?: Date;

  @Column({ name: 'VEHICLEDETAIL_NEXTMAINTENANCEDATE', type: 'datetime', nullable: true })
  VEHICLEDETAIL_NEXTMAINTENANCEDATE?: Date;

  @Column({ name: 'VEHICLEDETAIL_INSURANCEPOLICYNO', type: 'varchar', length: 255, nullable: true })
  VEHICLEDETAIL_INSURANCEPOLICYNO?: string;

  @Column({ name: 'VEHICLEDETAIL_INSURANCEEXPIARYDATE', type: 'datetime', nullable: true })
  VEHICLEDETAIL_INSURANCEEXPIARYDATE?: Date;

  @Column({ name: 'VEHICLEDETAIL_REGISTRATIONEXPIARYDATE', type: 'datetime', nullable: true })
  VEHICLEDETAIL_REGISTRATIONEXPIARYDATE?: Date;

  @Column({ name: 'VEHICLEDETAIL_INSECPTIONEXPIARYDATE', type: 'datetime', nullable: true })
  VEHICLEDETAIL_INSECPTIONEXPIARYDATE?: Date;

  @Column({ name: 'VEHICLEDETAIL_STATUS', type: 'int', default: 0 })
  VEHICLEDETAIL_STATUS: number;

  @Column({ name: 'VEHICLEDETAIL_CREATEDBY', type: 'int', nullable: true })
  VEHICLEDETAIL_CREATEDBY?: number;

  @Column({ name: 'VEHICLEDETAIL_CREATEDON', type: 'datetime', nullable: true })
  VEHICLEDETAIL_CREATEDON?: Date;

  @Column({ name: 'VEHICLEDETAIL_MODIFIEDBY', type: 'int', nullable: true })
  VEHICLEDETAIL_MODIFIEDBY?: number;

  @Column({ name: 'VEHICLEDETAIL_MODIFIEDON', type: 'datetime', nullable: true })
  VEHICLEDETAIL_MODIFIEDON?: Date;
}


@Entity('CFCM_VEHICLERETURNDETAIL')
export class VehicleReturnDetail {

  @PrimaryGeneratedColumn({ name: 'VEHICLERETURNDETAIL_ID' })
  VEHICLERETURNDETAIL_ID: number;

  @Column({ name: 'VEHICLERETURNDETAIL_VEHICLEID', type: 'int' })
  VEHICLERETURNDETAIL_VEHICLEID: number;

  @Column({ name: 'VEHICLERETURNDETAIL_BOOKINGID', type: 'int' })
  VEHICLERETURNDETAIL_BOOKINGID: number;

  @Column({ name: 'VEHICLERETURNDETAIL_MILEAGE', type: 'varchar', length: 255, nullable: true })
  VEHICLERETURNDETAIL_MILEAGE?: string;

  @Column({ name: 'VEHICLERETURNDETAIL_RETURNLOCATION', type: 'varchar', length: 255, nullable: true })
  VEHICLERETURNDETAIL_RETURNLOCATION?: string;

  @Column({ name: 'VEHICLERETURNDETAIL_ANYDAMAGE', type: 'varchar', length: 255, nullable: true })
  VEHICLERETURNDETAIL_ANYDAMAGE?: string;

  @Column({ name: 'VEHICLERETURNDETAIL_STATUS', type: 'int', default: 0 })
  VEHICLERETURNDETAIL_STATUS: number;

  @Column({ name: 'VEHICLERETURNDETAIL_CREATEDBY', type: 'int', nullable: true })
  VEHICLERETURNDETAIL_CREATEDBY?: number;

  @Column({ name: 'VEHICLERETURNDETAIL_CREATEDON', type: 'datetime', nullable: true })
  VEHICLERETURNDETAIL_CREATEDON?: Date;

  @Column({ name: 'VEHICLERETURNDETAIL_MODIFIEDBY', type: 'int', nullable: true })
  VEHICLERETURNDETAIL_MODIFIEDBY?: number;

  @Column({ name: 'VEHICLERETURNDETAIL_MODIFIEDON', type: 'datetime', nullable: true })
  VEHICLERETURNDETAIL_MODIFIEDON?: Date;
}