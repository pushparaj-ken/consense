import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';
import { Customer } from './customer.entity';
import { Driver } from './driver.entity';

@Entity({ name: 'CFCM_USERS' })
export class User {
  @PrimaryGeneratedColumn({ name: 'USER_ID' })
  USER_ID: number;

  @Column({ name: 'USER_USERNAME', type: 'varchar', length: 255 })
  USER_USERNAME: string;

  @Column({ name: 'USER_EMAIL', type: 'varchar', length: 255 })
  USER_EMAIL: string;

  @Column({ name: 'USER_PASSWORD', type: 'varchar', length: 255, nullable: true })
  USER_PASSWORD: string;

  @Column({ name: 'USER_FIRSTNAME', type: 'varchar', length: 255, nullable: true })
  USER_FIRSTNAME?: string;

  @Column({ name: 'USER_LASTNAME', type: 'varchar', length: 255, nullable: true })
  USER_LASTNAME?: string;

  @Column({ name: 'USER_PHONENO', type: 'varchar', length: 100, nullable: true })
  USER_PHONENO: string;

  @Column({ name: 'USER_CREATEDBY', type: 'int', nullable: true })
  USER_CREATEDBY?: number;

  @Column({ name: 'USER_CREATEDON', type: 'datetime', nullable: true })
  USER_CREATEDON?: Date;

  @Column({ name: 'USER_MODIFIEDBY', type: 'int', nullable: true })
  USER_MODIFIEDBY?: number;

  @Column({ name: 'USER_MODIFIEDON', type: 'datetime', nullable: true })
  USER_MODIFIEDON?: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.USER)
  USER_ROLES: UserRole[];
}


export interface RegisterUserData {
  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_FIRSTNAME?: string;
  USER_LASTNAME?: string;
  USER_PHONENO?: string;
  ROLE_ID?: number;
}