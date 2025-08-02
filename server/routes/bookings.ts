import { RequestHandler } from "express";
import {
  BookingData,
  BookingResponse,
  BookingListResponse,
  UpdateBookingStatusRequest,
} from "@shared/booking";

// In-memory storage for demo (replace with database in production)
let bookings: BookingData[] = [];
let bookingCounter = 1;

// Generate booking reference
function generateBookingReference(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "BF";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Send SMS/WhatsApp notification using Twilio
async function sendNotification(
  booking: BookingData,
  type: "confirmation" | "update",
): Promise<void> {
  const message =
    type === "confirmation"
      ? `🦋 Hello ${booking.name}! Your ${booking.type} booking at Butterfly Garden has been received!\n\n📅 Reference: ${booking.reference}\n📅 Date: ${booking.date} at ${booking.time}\n👥 Guests: ${booking.guests}\n\nWe'll confirm within 24 hours. Call 7992240355 for questions.\n\nThank you for choosing Butterfly Garden! 🌟`
      : `🦋 Hello ${booking.name}! Your booking ${booking.reference} status has been updated to: ${booking.status.toUpperCase()}.\n\nThank you for choosing Butterfly Garden! 🌟\n\nCall 7992240355 for any questions.`;

  try {
    // Using a mock service for now - in production, integrate with Twilio
    const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from("YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN").toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: booking.contactMethod === "whatsapp" ? "whatsapp:+14155238886" : "+1234567890",
        To: booking.contactMethod === "whatsapp" ? `whatsapp:+91${booking.phone}` : `+91${booking.phone}`,
        Body: message,
      }),
    });

    if (response.ok) {
      console.log(`✅ ${booking.contactMethod.toUpperCase()} notification sent successfully to ${booking.phone}`);
    } else {
      throw new Error(`Failed to send ${booking.contactMethod} notification`);
    }
  } catch (error) {
    // Fallback to console log if API fails
    console.log(`📱 ${booking.contactMethod.toUpperCase()} notification (fallback) to ${booking.phone}:`, message);

    // You can also integrate with other services like:
    // - WhatsApp Business API
    // - SMS Gateway APIs
    // - Third-party notification services
  }
}

// Create new booking
export const createBooking: RequestHandler = async (req, res) => {
  try {
    const bookingData: BookingData = req.body;

    // Validate required fields (only name and phone are mandatory)
    if (!bookingData.name || !bookingData.phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name and phone number are required",
      } as BookingResponse);
    }

    // Create booking
    const booking: BookingData = {
      ...bookingData,
      id: (bookingCounter++).toString(),
      reference: generateBookingReference(),
      status: "pending",
      createdAt: new Date(),
    };

    bookings.push(booking);

    // Send notification
    await sendNotification(booking, "confirmation");

    res.json({
      success: true,
      message: "Booking created successfully",
      reference: booking.reference,
      booking,
    } as BookingResponse);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as BookingResponse);
  }
};

// Get all bookings (admin only)
export const getAllBookings: RequestHandler = async (req, res) => {
  try {
    res.json({
      success: true,
      bookings: bookings.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      ),
    } as BookingListResponse);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      bookings: [],
    } as BookingListResponse);
  }
};

// Update booking status (admin only)
export const updateBookingStatus: RequestHandler = async (req, res) => {
  try {
    const { id, status, adminNotes }: UpdateBookingStatusRequest = req.body;

    const bookingIndex = bookings.findIndex((b) => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      } as BookingResponse);
    }

    bookings[bookingIndex].status = status;

    // Send notification about status update
    await sendNotification(bookings[bookingIndex], "update");

    res.json({
      success: true,
      message: "Booking status updated successfully",
      booking: bookings[bookingIndex],
    } as BookingResponse);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as BookingResponse);
  }
};

// Get booking by reference
export const getBookingByReference: RequestHandler = async (req, res) => {
  try {
    const { reference } = req.params;
    const booking = bookings.find((b) => b.reference === reference);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      } as BookingResponse);
    }

    res.json({
      success: true,
      message: "Booking found",
      booking,
    } as BookingResponse);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as BookingResponse);
  }
};
