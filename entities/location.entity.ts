import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("CFCM_LOCATION")
export class Location {
  @PrimaryGeneratedColumn({ name: "LOCATION_ID" })
  LOCATION_ID: number;

  @Column({ name: "LOCATION_CUSTOMERID" })
  LOCATION_CUSTOMERID: number;

  @Column({
    name: "LOCATION_TYPE",
    type: "int",
  })
  LOCATION_TYPE: number;

  @Column({ name: "LOCATION_NAME" })
  LOCATION_NAME: string;

  @Column({
    name: "LOCATION_STATUS",
    type: "int",
    default: 0
  })
  LOCATION_STATUS: number;

  @Column({ name: 'LOCATION_CREATEDBY', type: 'int', nullable: true })
  LOCATION_CREATEDBY?: number;

  @Column({ name: 'LOCATION_CREATEDON', type: 'datetime', nullable: true })
  LOCATION_CREATEDON?: Date;

  @Column({ name: 'LOCATION_MODIFIEDBY', type: 'int', nullable: true })
  LOCATION_MODIFIEDBY?: number;

  @Column({ name: 'LOCATION_MODIFIEDON', type: 'datetime', nullable: true })
  LOCATION_MODIFIEDON?: Date;
}
