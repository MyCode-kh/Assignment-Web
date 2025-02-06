import mongoose, { Schema, Document } from 'mongoose';

export interface ISeat extends Document {
  seatNumber: string;
  row: string;
  status: 'available' | 'booked';
}

const SeatSchema = new Schema<ISeat>({
  seatNumber: { type: String, required: true, unique: true },
  row: { type: String, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' }
});

export const SeatModel = mongoose.model<ISeat>('Seat', SeatSchema);