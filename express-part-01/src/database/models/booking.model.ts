import { Schema, model, Types } from "mongoose";

/**
 * Booking Interface (DTO)
 */
export interface IBooking {
  userId: Types.ObjectId;
  ticketId: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  bookingDate: Date;
}

// Mongoose Schema for Booking
const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
  },
  {
    versionKey: false, // Disables the `__v` field globally
  }
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);
