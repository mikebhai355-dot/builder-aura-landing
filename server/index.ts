import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  getBookingByReference,
} from "./routes/bookings";
import {
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
} from "./routes/menu";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Booking routes
  app.post("/api/bookings", createBooking);
  app.get("/api/bookings", getAllBookings);
  app.put("/api/bookings/status", updateBookingStatus);
  app.get("/api/bookings/:reference", getBookingByReference);

  // Menu routes
  app.get("/api/menu", getAllMenuItems);
  app.post("/api/menu", createMenuItem);
  app.put("/api/menu/:id", updateMenuItem);
  app.delete("/api/menu/:id", deleteMenuItem);
  app.put("/api/menu/:id/toggle", toggleMenuItemAvailability);

  return app;
}
