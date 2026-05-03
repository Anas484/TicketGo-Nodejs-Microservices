import {Router} from "express"
import {getAllUsers, getUserById, getAllEvents, createEvent, updateEvent, deleteEvent, getAllBookings, getBookingById, deleteBooking, generateSeats, getAllSeatsByEvents} from "../controllers/AdminController.js"
import { jwtFilter } from "../middlewares/JwtFilterMiddleware.js";
import {roleAccessMiddleware} from "../middlewares/RoleAccessMiddleware.js"


const AdminRouter = Router()

AdminRouter.get("/users", jwtFilter, roleAccessMiddleware("admin"), getAllUsers)
AdminRouter.get("/users/:id", jwtFilter, roleAccessMiddleware("admin"), getUserById)
AdminRouter.get("/events", jwtFilter, roleAccessMiddleware("admin"), getAllEvents)
AdminRouter.post("/events", jwtFilter, roleAccessMiddleware("admin"), createEvent)
AdminRouter.patch("/events/:id", jwtFilter, roleAccessMiddleware("admin"), updateEvent)
AdminRouter.delete("/events/:id", jwtFilter, roleAccessMiddleware("admin"), deleteEvent)
AdminRouter.get("/bookings", jwtFilter, roleAccessMiddleware("admin"), getAllBookings)
AdminRouter.get("/bookings/:id", jwtFilter, roleAccessMiddleware("admin"), getBookingById)
AdminRouter.delete("/bookings/:id", jwtFilter, roleAccessMiddleware("admin"), deleteBooking)
AdminRouter.get("/generate-seats/:id", jwtFilter, roleAccessMiddleware("admin"), generateSeats)
AdminRouter.get("/seats/:id", jwtFilter, roleAccessMiddleware("admin"), getAllSeatsByEvents)

export default AdminRouter