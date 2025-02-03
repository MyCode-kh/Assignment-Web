import { Controller, Post, Get, Route, Body, Path, Tags } from "tsoa";
import { IBooking } from "../database/models/booking.model"; // Import the DTO interface
import { BookingService } from "../services/booking.service";

/**
 * Booking Controller
 */
@Route("api/v1.0/bookings")
@Tags("Booking")
export class BookingController extends Controller {
  private bookingService = new BookingService();

  @Post()
  public async createBooking(@Body() booking: IBooking): Promise<IBooking> {
    return await this.bookingService.createBooking(booking);
  }

  @Get("{id}")
  public async getBookingById(@Path() id: string): Promise<IBooking | null> {
    return await this.bookingService.getBookingById(id);
  }
}
