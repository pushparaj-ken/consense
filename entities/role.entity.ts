import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'CFCM_ROLES' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'ROLES_ID' })
  ROLES_ID: number;

  @Column({ name: 'ROLES_NAME', type: 'varchar', length: 255, unique: true })
  ROLES_NAME: string;

  @Column({ name: 'ROLES_DESCRIPTION', type: 'varchar', length: 'MAX', nullable: true })
  ROLES_DESCRIPTION?: string;

  @Column({ name: 'ROLES_CREATEDBY', type: 'int', nullable: true })
  ROLES_CREATEDBY?: number;

  @Column({ name: 'ROLES_CREATEDON', type: 'datetime', nullable: true })
  ROLES_CREATEDON?: Date;

  @Column({ name: 'ROLES_MODIFIEDBY', type: 'int', nullable: true })
  ROLES_MODIFIEDBY?: number;

  @Column({ name: 'ROLES_MODIFIEDON', type: 'datetime', nullable: true })
  ROLES_MODIFIEDON?: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.ROLE)
  USER_ROLES: UserRole[];

  @OneToMany(() => Permission, (permission) => permission.ROLE)
  PERMISSION: Permission[];
}

export interface AssignRoleData {
  DRIVER_ID: number;
  ROLE_ID: number;
  DRIVER_USERID: number;
}