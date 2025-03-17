import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("CFCM_CUSTOMER")
export class Customer {
  @PrimaryGeneratedColumn({ name: "CUSTOMER_ID" })
  CUSTOMER_ID: number;

  @Column({ name: "CUSTOMER_USERID" })
  CUSTOMER_USERID: number;

  @Column({ name: "CUSTOMER_CODE", unique: true })
  CUSTOMER_CODE: number;

  @Column({ name: "CUSTOMER_COMPANYNAME" })
  CUSTOMER_COMPANYNAME: string;

  @Column({ name: "CUSTOMER_FIRSTNAME" })
  CUSTOMER_FIRSTNAME: string;

  @Column({ name: "CUSTOMER_LASTNAME" })
  CUSTOMER_LASTNAME: string;

  @Column({ name: "CUSTOMER_EMAIL", unique: true })
  CUSTOMER_EMAIL: string;

  @Column({ name: "CUSTOMER_PASSWORD", nullable: true })
  CUSTOMER_PASSWORD: string;

  @Column({ name: "CUSTOMER_PHONENO", nullable: true })
  CUSTOMER_PHONENO?: string;

  @Column({ name: "CUSTOMER_ADDRESS1", nullable: true })
  CUSTOMER_ADDRESS1?: string;

  @Column({ name: "CUSTOMER_ADDRESS2", nullable: true })
  CUSTOMER_ADDRESS2?: string;

  @Column({ name: "CUSTOMER_ADDRESS3", nullable: true })
  CUSTOMER_ADDRESS3?: string;

  @Column({ name: "CUSTOMER_ADDRESS4", nullable: true })
  CUSTOMER_ADDRESS4?: string;

  @Column({ name: "CUSTOMER_ZIPCODE", nullable: true })
  CUSTOMER_ZIPCODE?: number;

  @Column({ name: "CUSTOMER_EMAILVERIFICATIONCODE", nullable: true })
  CUSTOMER_EMAILVERIFICATIONCODE?: number;

  @Column({ name: "CUSTOMER_EMAILVERIFIED", default: 0 })
  CUSTOMER_EMAILVERIFIED?: boolean;

  @Column({ name: 'CUSTOMER_STATUS', type: 'int', default: 0 })
  CUSTOMER_STATUS?: number;

  @Column({ name: 'CUSTOMER_CREATEDBY', type: 'int', nullable: true })
  CUSTOMER_CREATEDBY?: number;

  @Column({ name: 'CUSTOMER_CREATEDON', type: 'datetime', nullable: true })
  CUSTOMER_CREATEDON?: Date;

  @Column({ name: 'CUSTOMER_MODIFIEDBY', type: 'int', nullable: true })
  CUSTOMER_MODIFIEDBY?: number;

  @Column({ name: 'CUSTOMER_MODIFIEDON', type: 'datetime', nullable: true })
  CUSTOMER_MODIFIEDON?: Date;
}
