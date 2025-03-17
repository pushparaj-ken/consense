import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("CFCM_PERMISSION")
export class Permission {
  @PrimaryGeneratedColumn({ name: "PERMISSION_ID" })
  PERMISSION_ID: number;

  @Column({ name: "PERMISSION_DESCRIPTION", nullable: true })
  PERMISSION_DESCRIPTION?: string;

  @Column({ name: "PERMISSION_RESOURCE" })
  PERMISSION_RESOURCE: string;

  @Column({ name: "PERMISSION_ACTION" })
  PERMISSION_ACTION: string;

  @Column({ name: "PERMISSION_TYPE" })
  PERMISSION_TYPE: string;

  @ManyToOne(() => Role, (role) => role.PERMISSION)
  @JoinColumn({ name: "PERMISSION_ROLEID" })
  ROLE: Role;

  @Column({ name: 'PERMISSION_CREATEDBY', type: 'int', nullable: true })
  PERMISSION_CREATEDBY?: number;

  @Column({ name: 'PERMISSION_CREATEDON', type: 'datetime', nullable: true })
  PERMISSION_CREATEDON?: Date;

  @Column({ name: 'PERMISSION_MODIFIEDBY', type: 'int', nullable: true })
  PERMISSION_MODIFIEDBY?: number;

  @Column({ name: 'PERMISSION_MODIFIEDON', type: 'datetime', nullable: true })
  PERMISSION_MODIFIEDON?: Date;
}
