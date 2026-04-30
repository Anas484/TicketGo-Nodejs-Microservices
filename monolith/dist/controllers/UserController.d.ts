import type { Request, Response } from "express";
declare const getAllEvents: (req: Request, res: Response) => Promise<void>;
declare const getEventsByName: (req: Request, res: Response) => Promise<void>;
declare const createBooking: (req: Request, res: Response) => Promise<void>;
declare const getMyDetails: (req: Request, res: Response) => void;
export { getAllEvents, getEventsByName, createBooking, getMyDetails };
//# sourceMappingURL=UserController.d.ts.map