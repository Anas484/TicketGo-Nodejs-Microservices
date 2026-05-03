import { Router } from "express";
import { getAllEvents, getEventsByName, createBooking, getMyDetails, getMyBookings } from "../controllers/UserController.js";
import { jwtFilter } from "../middlewares/JwtFilterMiddleware.js";
import { roleAccessMiddleware } from "../middlewares/RoleAccessMiddleware.js";
const UserRouter = Router();
UserRouter.get("/events", jwtFilter, roleAccessMiddleware("user"), getAllEvents);
UserRouter.get("/events/search", jwtFilter, roleAccessMiddleware("user"), getEventsByName);
UserRouter.post("/bookings", jwtFilter, roleAccessMiddleware("user"), createBooking);
UserRouter.get("/me", jwtFilter, roleAccessMiddleware("user"), getMyDetails);
UserRouter.get("/me/bookings", jwtFilter, roleAccessMiddleware("user"), getMyBookings);
export default UserRouter;
//# sourceMappingURL=UserRouter.js.map