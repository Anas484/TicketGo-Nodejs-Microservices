import { Router } from "express";
import { getAllEvents, getEventsByName, createBooking, getMyDetails } from "../controllers/UserController.js";
const UserRouter = Router();
UserRouter.get("/events", getAllEvents);
UserRouter.get("/events/search/:query", getEventsByName);
UserRouter.post("/bookings", createBooking);
UserRouter.get("/me", getMyDetails);
export default UserRouter;
//# sourceMappingURL=UserRouter.js.map