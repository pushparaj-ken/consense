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


@Entity('CFCM_BOOKINGPASSENGER')
export class BookingPassenger {

  @PrimaryGeneratedColumn({ name: 'BOOKINGPASSENGER_ID' })
  BOOKINGPASSENGER_ID: number;

  @Column({ name: 'BOOKINGPASSENGER_BOOKINGID', type: 'int' })
  BOOKINGPASSENGER_BOOKINGID: number;

  @Column({ name: 'BOOKINGPASSENGER_FIRSTNAME', type: 'varchar', length: 255, nullable: true })
  BOOKINGPASSENGER_FIRSTNAME?: string;

  @Column({ name: 'BOOKINGPASSENGER_LASTNAME', type: 'varchar', length: 255, nullable: true })
  BOOKINGPASSENGER_LASTNAME?: string;

  @Column({ name: 'BOOKINGPASSENGER_DEPARTMENT', type: 'varchar', length: 255, nullable: true })
  BOOKINGPASSENGER_DEPARTMENT?: string;

  @Column({ name: 'BOOKINGPASSENGER_PROJECT', type: 'varchar', length: 255, nullable: true })
  BOOKINGPASSENGER_PROJECT?: string;

  @Column({ name: 'BOOKINGPASSENGER_STATUS', type: 'int', default: 0 })
  BOOKINGPASSENGER_STATUS: number;

  @Column({ name: 'BOOKINGPASSENGER_CREATEDBY', type: 'int', nullable: true })
  BOOKINGPASSENGER_CREATEDBY?: number;

  @Column({ name: 'BOOKINGPASSENGER_CREATEDON', type: 'datetime', nullable: true })
  BOOKINGPASSENGER_CREATEDON?: Date;

  @Column({ name: 'BOOKINGPASSENGER_MODIFIEDBY', type: 'int', nullable: true })
  BOOKINGPASSENGER_MODIFIEDBY?: number;

  @Column({ name: 'BOOKINGPASSENGER_MODIFIEDON', type: 'datetime', nullable: true })
  BOOKINGPASSENGER_MODIFIEDON?: Date;
}


@Entity('CFCM_BOOKINGRETURN')
export class BookingReturn {

  @PrimaryGeneratedColumn({ name: 'BOOKINGRETURN_ID' })
  BOOKINGRETURN_ID: number;

  @Column({ name: 'BOOKINGRETURN_BOOKINGID', type: 'int' })
  BOOKINGRETURN_BOOKINGID: number;

  @Column({ name: 'BOOKINGRETURN_VEHICLEMILEAGE', type: 'varchar', length: 255, nullable: true })
  BOOKINGRETURN_VEHICLEMILEAGE?: string;

  @Column({ name: 'BOOKINGRETURN_VEHICLELOCATION', type: 'varchar', length: 255, nullable: true })
  BOOKINGRETURN_VEHICLELOCATION?: string;

  @Column({ name: 'BOOKINGRETURN_VEHICLEANYDAMAGE', type: 'varchar', length: 255, nullable: true })
  BOOKINGRETURN_VEHICLEANYDAMAGE?: string;

  @Column({ name: 'BOOKINGRETURN_STATUS', type: 'int', default: 0 })
  BOOKINGRETURN_STATUS: number;

  @Column({ name: 'BOOKINGRETURN_CREATEDBY', type: 'int', nullable: true })
  BOOKINGRETURN_CREATEDBY?: number;

  @Column({ name: 'BOOKINGRETURN_CREATEDON', type: 'datetime', nullable: true })
  BOOKINGRETURN_CREATEDON?: Date;

  @Column({ name: 'BOOKINGRETURN_MODIFIEDBY', type: 'int', nullable: true })
  BOOKINGRETURN_MODIFIEDBY?: number;

  @Column({ name: 'BOOKINGRETURN_MODIFIEDON', type: 'datetime', nullable: true })
  BOOKINGRETURN_MODIFIEDON?: Date;
} 