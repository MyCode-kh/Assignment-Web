

export interface SeatType {
  _id: string;
  seatNumber: string;
  row: string;
  section: string;
  type: "VIP" | "Regular" | "Balcony";
  isBooked?: boolean;
  price: number;
  bookingReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

