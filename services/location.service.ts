import { locationRepository } from "../repositories/location.repository";
import { Location } from '../entities/location.entity';
import { DBService } from "./db.service";

export const locationService = {

  async createLocation(data: Partial<Location>) {
    return await locationRepository.save(data);
  },

  async getLocations() {
    return await locationRepository.find();
  },

  async getLocationById(LOCATION_ID: number) {
    return await locationRepository.findOneBy({ LOCATION_ID });
  },

  async updateLocation(LOCATION_ID: number, data: Partial<Location>) {
    await locationRepository.update(LOCATION_ID, data);
    return await locationRepository.findOneBy({ LOCATION_ID });
  },

  async deleteLocation(id: number, data: Partial<Location>) {
    return await locationRepository.update(id, data);
  },
};
