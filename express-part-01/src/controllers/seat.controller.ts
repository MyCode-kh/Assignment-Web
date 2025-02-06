import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { ISeat } from "@/database/models/seat.model";
import { SeatService } from "@/services/seat.service";


@Tags("Seat")
@Route('seats')
export class SeatController extends Controller {
  private seatService = new SeatService();

  @Post('/')
  async createSeat(@Body() body: ISeat) {
    return await this.seatService.createSeat(body);
  }

  @Get('/')
  async getAllSeats() {
    return await this.seatService.getAllSeats();
  }

  @Get('/{id}')
  async getSeatById(@Path() id: string) {
    return await this.seatService.getSeatById(id);
  }

  @Put('/{id}')
  async updateSeat(@Path() id: string, @Body() body: Partial<ISeat>) {
    return await this.seatService.updateSeat(id, body);
  }

  @Delete('/{id}')
  async deleteSeat(@Path() id: string) {
    return await this.seatService.deleteSeat(id);
  }
}
