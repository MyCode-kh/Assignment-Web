import { IBooking } from "../database/models/booking.model";
import { BookingModel } from "../database/models/booking.model";
import { TicketModel } from "../database/models/ticket.model";

export class BookingService {
  public async createBooking(booking: IBooking): Promise<IBooking> {
    const ticket = await TicketModel.findById(booking.ticketId);
    if (!ticket) throw new Error("Ticket not found");

    // Calculate the total price based on ticket price and quantity
    booking.totalPrice = ticket.price * booking.quantity;

    return await BookingModel.create(booking);
  }

  public async getBookingById(id: string): Promise<IBooking | null> {
    return await BookingModel.findById(id).populate("ticketId");
  }
}
