import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DamageStatus } from '../libs/global/enum';

@Entity({ name: 'CFCM_CLAIM' })
export class Claim {
  @PrimaryGeneratedColumn({ name: 'CLAIM_ID' })
  CLAIM_ID: number;

  @Column({ name: 'CLAIM_VEHICLEID', type: 'int' })
  CLAIM_VEHICLEID: number;

  @Column({ name: 'CLAIM_TYPE', type: 'varchar', length: 255, nullable: true })
  CLAIM_TYPE?: string;

  @Column({ name: 'CLAIM_DESCRIPTION', type: 'varchar', length: 255, nullable: true })
  CLAIM_DESCRIPTION?: string;

  @Column({ name: 'CLAIM_DATE', type: 'datetime', nullable: true })
  CLAIM_DATE?: Date;

  @Column({ name: 'CLAIM_REPORTDATE', type: 'datetime', nullable: true })
  CLAIM_REPORTDATE?: Date;

  @Column({ name: 'CLAIM_ADDRESS1', type: 'varchar', length: 255, nullable: true })
  CLAIM_ADDRESS1?: string;

  @Column({ name: 'CLAIM_ADDRESS2', type: 'varchar', length: 100, nullable: true })
  CLAIM_ADDRESS2?: string;

  @Column({ name: 'CLAIM_ADDRESS3', type: 'varchar', length: 255, nullable: true })
  CLAIM_ADDRESS3?: string;

  @Column({ name: 'CLAIM_ADDRESS4', type: 'varchar', length: 255, nullable: true })
  CLAIM_ADDRESS4?: string;

  @Column({ name: 'CLAIM_ZIPCODE', type: 'varchar', length: 255, nullable: true })
  CLAIM_ZIPCODE?: string;

  @Column({ name: 'CLAIM_MILEAGE', type: 'varchar', length: 255, nullable: true })
  CLAIM_MILEAGE?: string;

  @Column({ name: 'CLAIM_TRIPTYPE', type: 'varchar', length: 255, nullable: true })
  CLAIM_TRIPTYPE?: string;

  @Column({ name: 'CLAIM_ISALCOHOL', type: 'varchar', length: 10, nullable: true })
  CLAIM_ISALCOHOL?: string;

  @Column({ name: 'CLAIM_NO', type: 'varchar', length: 255, nullable: true })
  CLAIM_NO?: string;

  @Column({ name: 'CLAIM_CUSTOMERID', type: 'int', nullable: true })
  CLAIM_CUSTOMERID?: number;

  @Column({ name: 'CLAIM_DRIVERID', type: 'int', nullable: true })
  CLAIM_DRIVERID?: number;

  @Column({ name: 'CLAIM_STAGE', type: 'varchar', length: 255, default: DamageStatus.Report_generated })
  CLAIM_STAGE?: string;

  @Column({ name: 'CLAIM_STATUS', type: 'int', default: 0 })
  CLAIM_STATUS: number;

  @Column({ name: 'CLAIM_CREATEDBY', type: 'int', nullable: true })
  CLAIM_CREATEDBY?: number;

  @Column({ name: 'CLAIM_CREATEDON', type: 'datetime', nullable: true })
  CLAIM_CREATEDON?: Date;

  @Column({ name: 'CLAIM_MODIFIEDBY', type: 'int', nullable: true })
  CLAIM_MODIFIEDBY?: number;

  @Column({ name: 'CLAIM_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIM_MODIFIEDON?: Date;
}

@Entity({ name: 'CFCM_CLAIMPARTS' })
export class ClaimParts {
  @PrimaryGeneratedColumn({ name: 'CLAIMPARTS_ID' })
  CLAIMPARTS_ID: number;

  @Column({ name: 'CLAIMPARTS_CLAIMID', type: 'int' })
  CLAIMPARTS_CLAIMID: number;

  @Column({ name: 'CLAIMPARTS_TIREFRONTLEFT', type: 'int', nullable: true })
  CLAIMPARTS_TIREFRONTLEFT?: number;

  @Column({ name: 'CLAIMPARTS_HEADLIGHTFRONTLEFT', type: 'int', nullable: true })
  CLAIMPARTS_HEADLIGHTFRONTLEFT?: number;

  @Column({ name: 'CLAIMPARTS_RIMFRONTLEFT', type: 'int', nullable: true })
  CLAIMPARTS_RIMFRONTLEFT?: number;

  @Column({ name: 'CLAIMPARTS_BUMPERFRONTLEFT', type: 'int', nullable: true })
  CLAIMPARTS_BUMPERFRONTLEFT?: number;

  @Column({ name: 'CLAIMPARTS_HEADLIGHTFRONTRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_HEADLIGHTFRONTRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_RIMFRONTRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_RIMFRONTRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_TIREFRONTRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_TIREFRONTRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_FENDERLEFT', type: 'int', nullable: true })
  CLAIMPARTS_FENDERLEFT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEMIRRORLEFT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEMIRRORLEFT?: number;

  @Column({ name: 'CLAIMPARTS_DOORFRONTLEFT', type: 'int', nullable: true })
  CLAIMPARTS_DOORFRONTLEFT?: number;

  @Column({ name: 'CLAIMPARTS_SILLLEFT', type: 'int', nullable: true })
  CLAIMPARTS_SILLLEFT?: number;

  @Column({ name: 'CLAIMPARTS_DOORREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_DOORREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEWINDOWREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEWINDOWREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEPANELREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEPANELREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEWINDOWFRONTLEFT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEWINDOWFRONTLEFT?: number;

  @Column({ name: 'CLAIMPARTS_ENGINEHOOD', type: 'int', nullable: true })
  CLAIMPARTS_ENGINEHOOD?: number;

  @Column({ name: 'CLAIMPARTS_WINDSHIELD', type: 'int', nullable: true })
  CLAIMPARTS_WINDSHIELD?: number;

  @Column({ name: 'CLAIMPARTS_ROOF', type: 'int', nullable: true })
  CLAIMPARTS_ROOF?: number;

  @Column({ name: 'CLAIMPARTS_WINDOWREAR', type: 'int', nullable: true })
  CLAIMPARTS_WINDOWREAR?: number;

  @Column({ name: 'CLAIMPARTS_TAILGATE', type: 'int', nullable: true })
  CLAIMPARTS_TAILGATE?: number;

  @Column({ name: 'CLAIMPARTS_SIDEWINDOWFRONTRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEWINDOWFRONTRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_FENDERRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_FENDERRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEMIRRORRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEMIRRORRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_DOORFRONTRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_DOORFRONTRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_SILLRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_SILLRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_DOORREARRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_DOORREARRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEWINDOWREARRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEWINDOWREARRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_SIDEPANELREARRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_SIDEPANELREARRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_TIREREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_TIREREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_HEADLIGHTREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_HEADLIGHTREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_RIMREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_RIMREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_BUMPERREARLEFT', type: 'int', nullable: true })
  CLAIMPARTS_BUMPERREARLEFT?: number;

  @Column({ name: 'CLAIMPARTS_HEADLIGHTREARRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_HEADLIGHTREARRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_RIMREARRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_RIMREARRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_TIREREARRIGHT', type: 'int', nullable: true })
  CLAIMPARTS_TIREREARRIGHT?: number;

  @Column({ name: 'CLAIMPARTS_STATUS', type: 'int', default: 0 })
  CLAIMPARTS_STATUS: number;

  @Column({ name: 'CLAIMPARTS_CREATEDBY', type: 'int', nullable: true })
  CLAIMPARTS_CREATEDBY?: number;

  @Column({ name: 'CLAIMPARTS_CREATEDON', type: 'datetime', nullable: true })
  CLAIMPARTS_CREATEDON?: Date;

  @Column({ name: 'CLAIMPARTS_MODIFIEDBY', type: 'int', nullable: true })
  CLAIMPARTS_MODIFIEDBY?: number;

  @Column({ name: 'CLAIMPARTS_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIMPARTS_MODIFIEDON?: Date;
}

@Entity({ name: 'CFCM_CLAIMPARTY' })
export class ClaimParty {
  @PrimaryGeneratedColumn({ name: 'CLAIMPARTY_ID' })
  CLAIMPARTY_ID: number;

  @Column({ name: 'CLAIMPARTY_CLAIMID', type: 'int' })
  CLAIMPARTY_CLAIMID: number;

  @Column({ name: 'CLAIMPARTY_NAME', type: 'varchar', length: 255 })
  CLAIMPARTY_NAME: string;

  @Column({ name: 'CLAIMPARTY_ADDRESS', type: 'text', nullable: true })
  CLAIMPARTY_ADDRESS?: string;

  @Column({ name: 'CLAIMPARTY_COMPANY', type: 'varchar', length: 255, nullable: true })
  CLAIMPARTY_COMPANY?: string;

  @Column({ name: 'CLAIMPARTY_EMAIL', type: 'varchar', length: 255, nullable: true })
  CLAIMPARTY_EMAIL?: string;

  @Column({ name: 'CLAIMPARTY_PHONENO1', type: 'varchar', length: 255, nullable: true })
  CLAIMPARTY_PHONENO1?: string;

  @Column({ name: 'CLAIMPARTY_INSURANCE', type: 'varchar', length: 255, nullable: true })
  CLAIMPARTY_INSURANCE?: string;

  @Column({ name: 'CLAIMPARTY_INSURANCENUMBER', type: 'varchar', length: 255, nullable: true })
  CLAIMPARTY_INSURANCENUMBER?: string;

  @Column({ name: 'CLAIMPARTY_STATUS', type: 'int', default: 0 })
  CLAIMPARTY_STATUS: number;

  @Column({ name: 'CLAIMPARTY_CREATEDBY', type: 'int', nullable: true })
  CLAIMPARTY_CREATEDBY?: number;

  @Column({ name: 'CLAIMPARTY_CREATEDON', type: 'datetime', nullable: true })
  CLAIMPARTY_CREATEDON?: Date;

  @Column({ name: 'CLAIMPARTY_MODIFIEDBY', type: 'int', nullable: true })
  CLAIMPARTY_MODIFIEDBY?: number;

  @Column({ name: 'CLAIMPARTY_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIMPARTY_MODIFIEDON?: Date;
}


@Entity({ name: 'CFCM_CLAIMPOLICE' })
export class ClaimPolice {
  @PrimaryGeneratedColumn({ name: 'CLAIMPOLICE_ID' })
  CLAIMPOLICE_ID: number;

  @Column({ name: 'CLAIMPOLICE_CLAIMID', type: 'int' })
  CLAIMPOLICE_CLAIMID: number;

  @Column({ name: 'CLAIMPOLICE_INVESTIGATIONFILENO', type: 'varchar', length: 255, nullable: true })
  CLAIMPOLICE_INVESTIGATIONFILENO?: string;

  @Column({ name: 'CLAIMPOLICE_DIARYNUMBER', type: 'text', nullable: true })
  CLAIMPOLICE_DIARYNUMBER?: string;

  @Column({ name: 'CLAIMPOLICE_DEPARTMENT', type: 'varchar', length: 255, nullable: true })
  CLAIMPOLICE_DEPARTMENT?: string;

  @Column({ name: 'CLAIMPOLICE_ADDRESS1', type: 'varchar', length: 255, nullable: true })
  CLAIMPOLICE_ADDRESS1?: string;

  @Column({ name: 'CLAIMPOLICE_ADDRESS2', type: 'varchar', length: 255, nullable: true })
  CLAIMPOLICE_ADDRESS2?: string;

  @Column({ name: 'CLAIMPOLICE_ZIPCODE', type: 'int', nullable: true })
  CLAIMPOLICE_ZIPCODE?: number;

  @Column({ name: 'CLAIMPOLICE_STATUS', type: 'int', default: 0 })
  CLAIMPOLICE_STATUS: number;

  @Column({ name: 'CLAIMPOLICE_CREATEDBY', type: 'int', nullable: true })
  CLAIMPOLICE_CREATEDBY?: number;

  @Column({ name: 'CLAIMPOLICE_CREATEDON', type: 'datetime', nullable: true })
  CLAIMPOLICE_CREATEDON?: Date;

  @Column({ name: 'CLAIMPOLICE_MODIFIEDBY', type: 'int', nullable: true })
  CLAIMPOLICE_MODIFIEDBY?: number;

  @Column({ name: 'CLAIMPOLICE_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIMPOLICE_MODIFIEDON?: Date;
}


@Entity({ name: 'CFCM_CLAIMPARKING' })
export class ClaimParking {
  @PrimaryGeneratedColumn({ name: 'CLAIMPARKING_ID' })
  CLAIMPARKING_ID: number;

  @Column({ name: 'CLAIMPARKING_CLAIMID', type: 'int' })
  CLAIMPARKING_CLAIMID: number;

  @Column({ name: 'CLAIMPARKING_ADDRESS1', type: 'varchar', length: 255, nullable: true })
  CLAIMPARKING_ADDRESS1?: string;

  @Column({ name: 'CLAIMPARKING_ADDRESS2', type: 'varchar', length: 255, nullable: true })
  CLAIMPARKING_ADDRESS2?: string;

  @Column({ name: 'CLAIMPARKING_ADDRESS3', type: 'varchar', length: 255, nullable: true })
  CLAIMPARKING_ADDRESS3?: string;

  @Column({ name: 'CLAIMPARKING_WORKSHOPINFO', type: 'varchar', length: 255, nullable: true })
  CLAIMPARKING_WORKSHOPINFO?: string;

  @Column({ name: 'CLAIMPARKING_ZIPCODE', type: 'int', nullable: true })
  CLAIMPARKING_ZIPCODE?: number;

  @Column({ name: 'CLAIMPARKING_STATUS', type: 'int', default: 0 })
  CLAIMPARKING_STATUS: number;

  @Column({ name: 'CLAIMPARKING_CREATEDBY', type: 'int', nullable: true })
  CLAIMPARKING_CREATEDBY?: number;

  @Column({ name: 'CLAIMPARKING_CREATEDON', type: 'datetime', nullable: true })
  CLAIMPARKING_CREATEDON?: Date;

  @Column({ name: 'CLAIMPARKING_MODIFIEDBY', type: 'int', nullable: true })
  CLAIMPARKING_MODIFIEDBY?: number;

  @Column({ name: 'CLAIMPARKING_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIMPARKING_MODIFIEDON?: Date;
}


@Entity({ name: 'CFCM_CLAIMDOCUMENT' })
export class ClaimDocument {
  @PrimaryGeneratedColumn({ name: 'CLAIMDOCUMENT_ID' })
  CLAIMDOCUMENT_ID: number;

  @Column({ name: 'CLAIMDOCUMENT_CLAIMID', type: 'int' })
  CLAIMDOCUMENT_CLAIMID: number;

  @Column({ name: 'CLAIMDOCUMENT_TYPE', type: 'varchar', length: 255 })
  CLAIMDOCUMENT_TYPE: string;

  @Column({ name: 'CLAIMDOCUMENT_FILE1', type: 'varchar', length: 'MAX', nullable: true })
  CLAIMDOCUMENT_FILE1?: string;

  @Column({ name: 'CLAIMDOCUMENT_FILE2', type: 'varchar', length: 'MAX', nullable: true })
  CLAIMDOCUMENT_FILE2?: string;

  @Column({ name: 'CLAIMDOCUMENT_FILE3', type: 'varchar', length: 'MAX', nullable: true })
  CLAIMDOCUMENT_FILE3?: string;

  @Column({ name: 'CLAIMDOCUMENT_STATUS', type: 'int', default: 0 })
  CLAIMDOCUMENT_STATUS: number;

  @Column({ name: 'CLAIMDOCUMENT_CREATEDBY', type: 'int', nullable: true })
  CLAIMDOCUMENT_CREATEDBY?: number;

  @Column({ name: 'CLAIMDOCUMENT_CREATEDON', type: 'datetime', nullable: true })
  CLAIMDOCUMENT_CREATEDON?: Date;

  @Column({ name: 'CLAIMDOCUMENT_MODIFIEDBY', type: 'int', nullable: true })
  CLAIMDOCUMENT_MODIFIEDBY?: number;

  @Column({ name: 'CLAIMDOCUMENT_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIMDOCUMENT_MODIFIEDON?: Date;
}

@Entity({ name: 'CFCM_CLAIMLOG' })
export class ClaimLog {
  @PrimaryGeneratedColumn({ name: 'CLAIMLOG_ID' })
  CLAIMLOG_ID: number;

  @Column({ name: 'CLAIMLOG_CLAIMID', type: 'int' })
  CLAIMLOG_CLAIMID: number;

  @Column({ name: 'CLAIMLOG_DATE', type: 'datetime', nullable: true })
  CLAIMLOG_DATE?: Date;

  @Column({ name: 'CLAIMLOG_REPORTDATE', type: 'datetime', nullable: true })
  CLAIMLOG_REPORTDATE?: Date;

  @Column({ name: 'CLAIMLOG_STAGE', type: 'varchar', length: 255 })
  CLAIMLOG_STAGE: string;

  @Column({ name: 'CLAIMLOG_STATUS', type: 'int', default: 0 })
  CLAIMLOG_STATUS: number;

  @Column({ name: 'CLAIMLOG_CREATEDBY', type: 'int', nullable: true })
  CLAIMLOG_CREATEDBY?: number;

  @Column({ name: 'CLAIMLOG_CREATEDON', type: 'datetime', nullable: true })
  CLAIMLOG_CREATEDON?: Date;

  @Column({ name: 'CLAIMLOG_MODIFIEDBY', type: 'int', nullable: true })
  CLAIMLOG_MODIFIEDBY?: number;

  @Column({ name: 'CLAIMLOG_MODIFIEDON', type: 'datetime', nullable: true })
  CLAIMLOG_MODIFIEDON?: Date;
}