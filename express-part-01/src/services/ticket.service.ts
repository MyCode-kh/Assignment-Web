import { ITicket } from "../database/models/ticket.model";
import { TicketModel } from "../database/models/ticket.model";

export class TicketService {
  public async createTicket(ticket: ITicket): Promise<ITicket> {
    return await TicketModel.create(ticket);
  }

  public async getAllTickets(): Promise<ITicket[]> {
    return await TicketModel.find();
  }
}
