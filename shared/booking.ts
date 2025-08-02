export interface BookingData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  duration?: string;
  type: "table" | "party";
  specialRequests?: string;
  decorations?: DecorationOption[];
  totalPrice?: number;
  contactMethod: "sms" | "whatsapp";
  status: "pending" | "confirmed" | "rejected";
  reference?: string;
  createdAt?: Date;
}

export interface DecorationOption {
  id: string;
  name: string;
  price: number;
  icon?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  reference?: string;
  booking?: BookingData;
}

export interface BookingListResponse {
  success: boolean;
  bookings: BookingData[];
}

export interface UpdateBookingStatusRequest {
  id: string;
  status: "confirmed" | "rejected";
  adminNotes?: string;
}
