import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'CFCM_USERROLE' })
export class UserRole {
  @PrimaryGeneratedColumn({ name: 'USERROLE_ID' })
  USERROLE_ID: number;

  @Column({ name: 'USERROLE_USERID', type: 'int' })
  USERROLE_USERID: number;

  @Column({ name: 'USERROLE_ROLEID', type: 'int' })
  USERROLE_ROLEID: number;

  @Column({ name: 'ROLES_CREATEDBY', type: 'int', nullable: true })
  ROLES_CREATEDBY?: number;

  @Column({ name: 'ROLES_CREATEDON', type: 'datetime', nullable: true })
  ROLES_CREATEDON?: Date;

  @Column({ name: 'ROLES_MODIFIEDBY', type: 'int', nullable: true })
  ROLES_MODIFIEDBY?: number;

  @Column({ name: 'ROLES_MODIFIEDON', type: 'datetime', nullable: true })
  ROLES_MODIFIEDON?: Date;

  @ManyToOne(() => User, (user) => user.USER_ROLES)
  @JoinColumn({ name: "USERROLE_USERID" })
  USER: User;

  @ManyToOne(() => Role, (role) => role.USER_ROLES)
  @JoinColumn({ name: "USERROLE_ROLEID" })
  ROLE: Role;
}
