import { Controller, Post, Get, Route, Body, Tags } from "tsoa";
import { ITicket } from "../database/models/ticket.model"; // Import the DTO interface
import { TicketService } from "../services/ticket.service";

/**
 * Ticket Controller
 */
@Route("api/v1.0/tickets")
@Tags("Ticket")
export class TicketController extends Controller {
  private ticketService = new TicketService();

  @Post()
  public async createTicket(@Body() ticket: ITicket): Promise<ITicket> {
    return await this.ticketService.createTicket(ticket);
  }

  @Get()
  public async getAllTickets(): Promise<ITicket[]> {
    return await this.ticketService.getAllTickets();
  }
}
