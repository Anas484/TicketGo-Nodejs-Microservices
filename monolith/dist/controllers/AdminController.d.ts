import { type Request, type Response } from "express";
declare const getAllUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllEvents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const createEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const updateEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllBookings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getBookingById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const generateSeats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { getAllUsers, getUserById, getAllEvents, createEvent, updateEvent, deleteEvent, getAllBookings, getBookingById, deleteBooking, generateSeats };
//# sourceMappingURL=AdminController.d.ts.map