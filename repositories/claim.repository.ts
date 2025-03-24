import { AppDataSource } from "../config/database";
import { Claim, ClaimDocument, ClaimLog, ClaimParking, ClaimParts, ClaimParty, ClaimPolice } from '../entities/claim.entity';

export const claimRepository = AppDataSource.getRepository(Claim);

export const claimPartsRepository = AppDataSource.getRepository(ClaimParts);

export const claimPartyRepository = AppDataSource.getRepository(ClaimParty);

export const claimPoliceRepository = AppDataSource.getRepository(ClaimPolice);

export const claimParkingRepository = AppDataSource.getRepository(ClaimParking);

export const claimDocumentRepository = AppDataSource.getRepository(ClaimDocument);

export const claimLogRepository = AppDataSource.getRepository(ClaimLog);
