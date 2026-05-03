import type { Request, Response } from "express";
declare const getAllEvents: (req: Request, res: Response) => Promise<void>;
declare const getEventsByName: (req: Request, res: Response) => Promise<void>;
declare const createBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getMyBookings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getMyDetails: (req: Request, res: Response) => void;
declare const getAllSeatsByEvents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { getAllEvents, getEventsByName, createBooking, getMyBookings, getMyDetails, getAllSeatsByEvents };
//# sourceMappingURL=UserController.d.ts.map