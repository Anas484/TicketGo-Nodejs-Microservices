import { Router } from "express";
import { getAllUsers, getUserById, getAllEvents, createEvent, updateEvent, deleteEvent, getAllBookings, getBookingById, deleteBooking } from "../controllers/AdminController.js";
const AdminRouter = Router();
AdminRouter.get("/users", getAllUsers);
AdminRouter.get("/users/:id", getUserById);
AdminRouter.get("/events", getAllEvents);
AdminRouter.post("/events", createEvent);
AdminRouter.patch("/events/:id", updateEvent);
AdminRouter.delete("/events/:id", deleteEvent);
AdminRouter.get("/bookings", getAllBookings);
AdminRouter.get("/bookings/:id", getBookingById);
AdminRouter.delete("/bookings/:id", deleteBooking);
export default AdminRouter;
//# sourceMappingURL=AdminRouter.js.map