import { ISeat, SeatModel } from "../models/seat.model";

export class SeatRepository {
  async create(seatData: ISeat) {
    return await SeatModel.create(seatData);
  }
  async findAll() {
    return await SeatModel.find();
  }
  async findById(id: string) {
    return await SeatModel.findById(id);
  }
  async update(id: string, seatData: Partial<ISeat>) {
    return await SeatModel.findByIdAndUpdate(id, seatData, { new: true });
  }
  async delete(id: string) {
    return await SeatModel.findByIdAndDelete(id);
  }
}
