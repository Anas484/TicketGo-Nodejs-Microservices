import type { Request, Response } from "express";
import type { BookingRequest } from "../interfaces/UserInterface.js";
import { lockSeats, areSeatsAvailable } from "../utils/BookingUtils.js"
import { userResponseMapper } from "../utils/Mapper.js";
import { updateSeatStatusSchema  } from "../zod/InternalZod.js";
import { updateSeatsInternal } from "../utils/BookingUtils.js";
import {prisma} from "../utils/PrismaConn.js"
import { bookSeatsSchema } from "../zod/UserZod.js";


const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json({ "data": events });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};


const getEventsByName = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            where: {
                name: {
                    contains: req.query.q as string,
                    mode:'insensitive'
                }
            }
        });
        res.status(200).json({ "data": events });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};


const createBooking = async (req: Request, res: Response) => {
    try {
        const userId :any=  req.user?.id
        const parsed = bookSeatsSchema.safeParse(req.body)
        if (!parsed.success) {
            throw new Error("Please enter field correctly");
            
        }
        const {eventId, seatNumbers} = parsed.data;

        await lockSeats(userId, eventId.toString(), seatNumbers);

        const areSeatsAvailableResult = await areSeatsAvailable(eventId, seatNumbers);
        if (areSeatsAvailableResult) {
            const booking = await prisma.booking.create({
            data: {
                userId: Number(userId),
                eventId: eventId,
                seatNumbers: seatNumbers
            }
        });
        await updateSeatsInternal(eventId, seatNumbers);
        return res.status(200).json({ "data": booking });
        }
        return res.status(400).json({ "message": "Some seats are not available" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "message": `Server error ${error}` });
    }
};


const getMyBookings = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        const bookings = await prisma.booking.findMany({
            where: {
                userId: Number(userId)
            }
        })
        return res.status(200).json({ "data": bookings })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": `Server error ${error}` })
    }
}

const getMyDetails = (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        const user: any = prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })
        if (!user) {
            res.status(404).json({ "message": "User not found" })
        }
        const userData = userResponseMapper(user)
        res.status(200).json({ "data": userData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": `Server error ${error}` })
    }
}

const getAllSeatsByEvents = async(req: Request, res: Response) => {
    try {
        const seats = await prisma.seat.findMany({
            where: {
                eventId: Number(req.params.id)
            }
        });
        return res.status(200).json({"data": seats})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}


export {
    getAllEvents,
    getEventsByName,
    createBooking,
    getMyBookings,
    getMyDetails,
    getAllSeatsByEvents
}
