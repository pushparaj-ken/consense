import { Claim, ClaimDocument, ClaimParking, ClaimParts, ClaimParty, ClaimPolice } from '../entities/claim.entity';
import { claimRepository, claimPartsRepository, claimPartyRepository, claimPoliceRepository, claimParkingRepository, claimDocumentRepository } from "../repositories/claim.repository";

export const claimService = {

  async createClaim(data: Partial<Claim>) {
    return await claimRepository.save(data);
  },

  async getClaims(limit: number, offset: number, query: any) {
    const [claim, totalItems] = await claimRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { claim, totalItems };
  },

  async getcClaimById(CLAIM_ID: number) {
    return await claimRepository.findOneBy({ CLAIM_ID });
  },

  async updateClaim(CLAIM_ID: number, data: Partial<Claim>) {
    await claimRepository.update(CLAIM_ID, data);
    return await claimRepository.findOneBy({ CLAIM_ID });
  },

  async deleteClaim(id: number, data: Partial<Claim>) {
    return await claimRepository.update(id, data);
  },

  async getClaim(where: any) {
    return await claimRepository.findOneBy(where);
  },

  //Parts Services

  async createClaimParts(data: Partial<ClaimParts>) {
    return await claimPartsRepository.save(data);
  },

  async getClaimsParts(limit: number, offset: number, query: any) {
    const [claimparts, totalItems] = await claimPartsRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { claimparts, totalItems };
  },

  async getcClaimPartsById(CLAIMPARTS_ID: number) {
    return await claimPartsRepository.findOneBy({ CLAIMPARTS_ID });
  },

  async updatePartsClaim(CLAIMPARTS_ID: number, data: Partial<ClaimParts>) {
    await claimPartsRepository.update(CLAIMPARTS_ID, data);
    return await claimPartsRepository.findOneBy({ CLAIMPARTS_ID });
  },

  async deleteClaimParts(id: number, data: Partial<ClaimParts>) {
    return await claimPartsRepository.update(id, data);
  },

  async getClaimParts(where: any) {
    return await claimPartsRepository.findOneBy(where);
  },

  //Party Services

  async createClaimParty(data: Partial<ClaimParty>) {
    return await claimPartyRepository.save(data);
  },

  async getClaimsParty(limit: number, offset: number, query: any) {
    const [claimParty, totalItems] = await claimPartyRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { claimParty, totalItems };
  },

  async getcClaimPartyById(CLAIMPARTY_ID: number) {
    return await claimPartyRepository.findOneBy({ CLAIMPARTY_ID });
  },

  async updatePartyClaim(CLAIMPARTY_ID: number, data: Partial<ClaimParty>) {
    await claimPartyRepository.update(CLAIMPARTY_ID, data);
    return await claimPartyRepository.findOneBy({ CLAIMPARTY_ID });
  },

  async deleteClaimParty(id: number, data: Partial<ClaimParty>) {
    return await claimPartyRepository.update(id, data);
  },

  async getClaimParty(where: any) {
    return await claimPartyRepository.findOneBy(where);
  },

  //Police Services

  async createClaimPolice(data: Partial<ClaimPolice>) {
    return await claimPoliceRepository.save(data);
  },

  async getClaimsPolice(limit: number, offset: number, query: any) {
    const [claimPolice, totalItems] = await claimPoliceRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { claimPolice, totalItems };
  },

  async getcClaimPoliceById(CLAIMPOLICE_ID: number) {
    return await claimPoliceRepository.findOneBy({ CLAIMPOLICE_ID });
  },

  async updatePoliceClaim(CLAIMPOLICE_ID: number, data: Partial<ClaimPolice>) {
    await claimPoliceRepository.update(CLAIMPOLICE_ID, data);
    return await claimPoliceRepository.findOneBy({ CLAIMPOLICE_ID });
  },

  async deleteClaimPolice(id: number, data: Partial<ClaimPolice>) {
    return await claimPoliceRepository.update(id, data);
  },

  //Parking Services

  async createClaimParking(data: Partial<ClaimParking>) {
    return await claimParkingRepository.save(data);
  },

  async getClaimsParking(limit: number, offset: number, query: any) {
    const [claimParking, totalItems] = await claimParkingRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { claimParking, totalItems };
  },

  async getcClaimParkingById(CLAIMPARKING_ID: number) {
    return await claimParkingRepository.findOneBy({ CLAIMPARKING_ID });
  },

  async updateParkingClaim(CLAIMPARKING_ID: number, data: Partial<ClaimParking>) {
    await claimParkingRepository.update(CLAIMPARKING_ID, data);
    return await claimParkingRepository.findOneBy({ CLAIMPARKING_ID });
  },

  async deleteClaimParking(id: number, data: Partial<ClaimParking>) {
    return await claimParkingRepository.update(id, data);
  },

  //Document Services

  async createClaimDocument(data: Partial<ClaimDocument>) {
    return await claimDocumentRepository.save(data);
  },

  async getClaimsDocument(limit: number, offset: number, query: any) {
    const [claimDocument, totalItems] = await claimDocumentRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
    });

    return { claimDocument, totalItems };
  },

  async getcClaimDocumentById(CLAIMDOCUMENT_ID: number) {
    return await claimDocumentRepository.findOneBy({ CLAIMDOCUMENT_ID });
  },

  async updateDocumentClaim(CLAIMDOCUMENT_ID: number, data: Partial<ClaimDocument>) {
    await claimDocumentRepository.update(CLAIMDOCUMENT_ID, data);
    return await claimDocumentRepository.findOneBy({ CLAIMDOCUMENT_ID });
  },

  async deleteClaimDocument(id: number, data: Partial<ClaimDocument>) {
    return await claimDocumentRepository.update(id, data);
  },
};
