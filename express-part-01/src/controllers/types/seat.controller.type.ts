export interface CreateSeatRequest {
    seatNumber: string;
    row: string;
    section: string;
    type: "VIP" | "Regular" | "Balcony";
    isBooked?: boolean;
    price: number;
    bookingReference?: string;
}