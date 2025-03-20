import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CFCM_BOOKING')
export class Booking {

  @PrimaryGeneratedColumn({ name: 'BOOKING_ID' })
  BOOKING_ID: number;

  @Column({ name: 'BOOKING_DRIVERID', type: 'int' })
  BOOKING_DRIVERID: number;

  @Column({ name: 'BOOKING_VEHICLEID', type: 'int' })
  BOOKING_VEHICLEID: number;

  @Column({ name: 'BOOKING_STARTDATE', type: 'datetime' })
  BOOKING_STARTDATE: Date;

  @Column({ name: 'BOOKING_ENDDATE', type: 'datetime' })
  BOOKING_ENDDATE: Date;

  @Column({ name: 'BOOKING_COSTCENTER', type: 'varchar', length: 255, nullable: true })
  BOOKING_COSTCENTER?: string;

  @Column({ name: 'BOOKING_TRAVELREASON', type: 'varchar', length: 255, nullable: true })
  BOOKING_TRAVELREASON?: string;

  @Column({ name: 'BOOKING_DEPARTMENT', type: 'varchar', length: 255, nullable: true })
  BOOKING_DEPARTMENT?: string;

  @Column({ name: 'BOOKING_PROJECT', type: 'varchar', length: 255, nullable: true })
  BOOKING_PROJECT?: string;

  @Column({ name: 'BOOKING_PASSENGERFIRSTNAME', type: 'varchar', length: 255, nullable: true })
  BOOKING_PASSENGERFIRSTNAME?: string;

  @Column({ name: 'BOOKING_PASSENGERLASTNAME', type: 'varchar', length: 255, nullable: true })
  BOOKING_PASSENGERLASTNAME?: string;

  @Column({ name: 'BOOKING_PASSENGERDEPARTMENT', type: 'varchar', length: 255, nullable: true })
  BOOKING_PASSENGERDEPARTMENT?: string;

  @Column({ name: 'BOOKING_PASSENGERPROJECT', type: 'varchar', length: 255, nullable: true })
  BOOKING_PASSENGERPROJECT?: string;

  @Column({ name: 'BOOKING_VEHICLERETURNMILEAGE', type: 'varchar', length: 255, nullable: true })
  BOOKING_VEHICLERETURNMILEAGE?: string;

  @Column({ name: 'BOOKING_VEHICLERETURNLOCATION', type: 'varchar', length: 255, nullable: true })
  BOOKING_VEHICLERETURNLOCATION?: string;

  @Column({ name: 'BOOKING_VEHICLERETURNANYDAMAGE', type: 'varchar', length: 255, nullable: true })
  BOOKING_VEHICLERETURNANYDAMAGE?: string;

  @Column({ name: 'BOOKING_LICENSENO', type: 'varchar', length: 255, nullable: true })
  BOOKING_LICENSENO?: string;

  @Column({ name: 'BOOKING_LICENSEVEHICLECLASS', type: 'varchar', length: 255, nullable: true })
  BOOKING_LICENSEVEHICLECLASS?: string;

  @Column({ name: 'BOOKING_LICENSEDATEOFISSUE', type: 'datetime', nullable: true })
  BOOKING_LICENSEDATEOFISSUE?: Date;

  @Column({ name: 'BOOKING_LICENSEEXPIRYDATE', type: 'datetime', nullable: true })
  BOOKING_LICENSEEXPIRYDATE?: Date;

  @Column({ name: 'BOOKING_LICENSECOUNTRYISSUE', type: 'varchar', length: 255, nullable: true })
  BOOKING_LICENSECOUNTRYISSUE?: string;

  @Column({ name: 'BOOKING_LICENSEPLACEOFISSUE', type: 'varchar', length: 255, nullable: true })
  BOOKING_LICENSEPLACEOFISSUE?: string;

  @Column({ name: 'BOOKING_STATUS', type: 'int', default: 0 })
  BOOKING_STATUS: number;

  @Column({ name: 'BOOKING_CREATEDBY', type: 'int', nullable: true })
  BOOKING_CREATEDBY?: number;

  @Column({ name: 'BOOKING_CREATEDON', type: 'datetime', nullable: true })
  BOOKING_CREATEDON?: Date;

  @Column({ name: 'BOOKING_MODIFIEDBY', type: 'int', nullable: true })
  BOOKING_MODIFIEDBY?: number;

  @Column({ name: 'BOOKING_MODIFIEDON', type: 'datetime', nullable: true })
  BOOKING_MODIFIEDON?: Date;
} 