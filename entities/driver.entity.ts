import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./customer.entity";

@Entity("CFCM_DRIVER")
export class Driver {
  @PrimaryGeneratedColumn({ name: "DRIVER_ID" })
  DRIVER_ID: number;

  @Column({ name: "DRIVER_USERID" })
  DRIVER_USERID: number;

  @Column({ name: "DRIVER_DUPICATEID", default: 0 })
  DRIVER_DUPICATEID: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "DRIVER_CUSTOMERID" })
  DRIVER_CUSTOMERID: Customer;

  @Column({ name: "DRIVER_FIRSTNAME" })
  DRIVER_FIRSTNAME: string;

  @Column({ name: "DRIVER_LASTNAME" })
  DRIVER_LASTNAME: string;

  @Column({ name: "DRIVER_EMAIL" })
  DRIVER_EMAIL: string;

  @Column({ name: "DRIVER_PASSWORD", nullable: true })
  DRIVER_PASSWORD: string;

  @Column({ name: "DRIVER_PHONENO", nullable: true })
  DRIVER_PHONENO?: string;

  @Column({ name: "DRIVER_COUNTRYCODE", nullable: true })
  DRIVER_COUNTRYCODE?: string;

  @Column({ name: "DRIVER_ADDRESS1", nullable: true })
  DRIVER_ADDRESS1?: string;

  @Column({ name: "DRIVER_ADDRESS2", nullable: true })
  DRIVER_ADDRESS2?: string;

  @Column({ name: "DRIVER_ADDRESS3", nullable: true })
  DRIVER_ADDRESS3?: string;

  @Column({ name: "DRIVER_ADDRESS4", nullable: true })
  DRIVER_ADDRESS4?: string;

  @Column({ name: "DRIVER_ZIPCODE", nullable: true })
  DRIVER_ZIPCODE?: number;

  @Column({ name: "DRIVER_EMAILVERFICATIONCODE", nullable: true })
  DRIVER_EMAILVERFICATIONCODE?: number;

  @Column({
    name: "DRIVER_EMAILVERFIED",
    type: "bit",
    default: false
  })
  DRIVER_EMAILVERFIED: boolean;

  @Column({ name: "DRIVER_RESETPASSWORDTOKEN", nullable: true })
  DRIVER_RESETPASSWORDTOKEN?: string;

  @Column({ name: "DRIVER_RESETPASSWORDEXPIRES", nullable: true })
  DRIVER_RESETPASSWORDEXPIRES?: string;

  @Column({ name: "DRIVER_STATUS", type: 'int', default: 0 })
  DRIVER_STATUS: number;

  @Column({ name: 'DRIVER_CREATEDBY', type: 'int', nullable: true })
  DRIVER_CREATEDBY?: number;

  @Column({ name: 'DRIVER_CREATEDON', type: 'datetime', nullable: true })
  DRIVER_CREATEDON?: Date;

  @Column({ name: 'DRIVER_MODIFIEDBY', type: 'int', nullable: true })
  DRIVER_MODIFIEDBY?: number;

  @Column({ name: 'DRIVER_MODIFIEDON', type: 'datetime', nullable: true })
  DRIVER_MODIFIEDON?: Date;
}


export interface LoginDriverData {
  DRIVER_EMAIL: string;
  DRIVER_PASSWORD: string;
  CUSTOMER_CODE: number;
}

export interface RegisterDriverData {
  DRIVER_EMAIL: string;
  DRIVER_FIRSTNAME: string;
  DRIVER_LASTNAME: string;
  CUSTOMER_CODE: number;
  DRIVER_USERID?: number;
  DRIVER_CUSTOMERID?: number;
  DRIVER_PASSWORD?: string;
}

export interface VerficationCodeData {
  CUSTOMER_CODE: number;
}

export interface PasswordDriverData {
  password: string;
  cpassword: string;
  DRIVER_ID?: number;
}

export interface ForgetPasswordDriverData {
  DRIVER_EMAIL: string;
}

export interface ResetPasswordDriverData {
  DRIVER_PASSWORD: string;
  token: string;
}

export interface DriverUpdateData {
  DRIVER_PASSWORD: string;
  token: string;
}