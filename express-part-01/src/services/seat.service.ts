import { ISeat } from "@/database/models/seat.model";
import { SeatRepository } from "@/database/repositories/seat.repository";

export class SeatService {
  private seatRepo = new SeatRepository();

  async createSeat(data: ISeat) {
    return await this.seatRepo.create(data);
  }
  async getAllSeats() {
    return await this.seatRepo.findAll();
  }
  async getSeatById(id: string) {
    return await this.seatRepo.findById(id);
  }
  async updateSeat(id: string, data: Partial<ISeat>) {
    return await this.seatRepo.update(id, data);
  }
  async deleteSeat(id: string) {
    return await this.seatRepo.delete(id);
  }
}