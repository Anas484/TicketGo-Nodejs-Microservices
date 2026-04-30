import { type Request, type Response } from "express";
declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
declare const getUserById: (req: Request, res: Response) => Promise<void>;
declare const getAllEvents: (req: Request, res: Response) => Promise<void>;
declare const createEvent: (req: Request, res: Response) => Promise<void>;
declare const updateEvent: (req: Request, res: Response) => Promise<void>;
declare const deleteEvent: (req: Request, res: Response) => Promise<void>;
declare const getAllBookings: (req: Request, res: Response) => Promise<void>;
declare const getBookingById: (req: Request, res: Response) => Promise<void>;
declare const deleteBooking: (req: Request, res: Response) => Promise<void>;
declare const generateSeats: (req: Request, res: Response) => Promise<void>;
export { getAllUsers, getUserById, getAllEvents, createEvent, updateEvent, deleteEvent, getAllBookings, getBookingById, deleteBooking, generateSeats };
//# sourceMappingURL=AdminController.d.ts.map