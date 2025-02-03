import { Schema, model } from "mongoose";

/**
 * Ticket Interface (DTO)
 */
export interface ITicket {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// Mongoose Schema for Ticket
const ticketSchema = new Schema<ITicket>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    versionKey: false, // Disables the `__v` field globally
  }
);

export const TicketModel = model<ITicket>("Ticket", ticketSchema);
