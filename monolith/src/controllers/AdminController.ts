import{type Request, type Response} from "express"
import { prisma } from "../utils/PrismaConn.js"
import { EventRequestSchema ,EventResponseSchema ,UserResponseSchema , updateEventsRequestSchema  } from "../zod/AdminZod.js"
import z from "zod"
import { id } from "zod/locales";



const UsersArrayZod = z.array(UserResponseSchema);
const EventsArrayZod = z.array(EventResponseSchema)



const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        const userResponse = UsersArrayZod.safeParse(users);
        if (!userResponse.success) {
            console.log("error with DB")
        }
        return res.status(200).json({message:"success", users:userResponse.data})
    }catch (error){
        console.log(error)
        res.status(500).json({"message":`Server error ${error}`});
    }
}

const getUserById = async(req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (!user) {
            return res.status(400).json({"message": "user not found"})
        }
        const userResponse = UserResponseSchema.safeParse(user);
        if (!userResponse.success) {
            return res.status(400).json({message:"Validation error"})
        }
        return res.status(200).json({message:"success",data:userResponse.data})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}



const getAllEvents = async(req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();
        const eventsResponse = EventsArrayZod.safeParse(events);
        if (!eventsResponse.success) {
            throw new Error("Validation error");
        }
        return res.status(200).json({message:"success",data:eventsResponse.data})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}

const createEvent = async(req: Request, res: Response) => {
    try {
        const parseEvent = EventRequestSchema.safeParse(req.body);
        if (!parseEvent.success) {
            throw new Error("Please enter correct fields");
        }
        const {name, description, date, location, capacity} = parseEvent.data
        const event = await prisma.event.create({
            data: {
                name: name,
                description: description,
                date: date,
                location: location,
                capacity: capacity
            }
        });
        return res.status(201).json({message:"success",data:event})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}

const updateEvent = async(req: Request, res: Response) => {
    try {
        const parsedEvent = updateEventsRequestSchema.safeParse(req.body)
        const id = Number(req.params.id)
        if (!parsedEvent.success) {
            throw new Error("Please enter correct fields");
        }
        const cleanedData = Object.fromEntries(
            Object.entries(parsedEvent.data).filter(([_, v]) => v !== undefined)
        );
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid event id" });
         }
        const event = await prisma.event.update({
            where: {
                id: id
            },
            data: cleanedData
        });
        return res.status(200).json({"data": event})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}

const deleteEvent = async(req: Request, res: Response) => {
    try {
        const event = await prisma.event.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).json({"data": event})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}


const getAllBookings = async(req: Request, res: Response) => {
    try {
        const bookings = await prisma.booking.findMany();
        return res.status(200).json({"data": bookings})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}


const getBookingById = async(req: Request, res: Response) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).json({"data": booking})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}

const deleteBooking = async(req: Request, res: Response) => {
    try {
        const booking = await prisma.booking.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).json({"data": booking})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}

const generateSeats = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where:{
                id: Number(id)
            },
            select:{
                capacity:true
            }
        });
        const isSeats = await prisma.seat.findMany({
            where:{
                eventId: id
            }
        });
        if(isSeats.length > 0){
            return res.status(400).json({"message":"Seats already generated"});
        }
        const random = ["A","B","C"]
        const seats = await prisma.seat.createMany({
            data: Array.from({ length: Number(event?.capacity) }, (_, i) => ({
                eventId: id,    
                seatNumber: `${random[i % random.length]}${i + 1}`,
                price: Number((Math.random() * 500 + 100).toFixed(2)),
                isAvailable: true
            }))
        });
        return res.status(200).json({"data": seats})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
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


const getAvailableSeatsCount = async(req: Request, res: Response) => {
    try {
        let count = 0;
        const seats : any = await prisma.seat.count({
            where: {
                eventId: Number(req.params.id),
                isAvailable: true
            }
        });
        for(const seat of seats){
            if (seat.isAvailable == true) {
                count++;
            }
        }
        return res.status(200).json({"data": count})
    }catch (error){
        console.log(error)
        return res.status(500).json({"message":`Server error ${error}`});
    }
}



export {
    getAllUsers,
    getUserById,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getAllBookings,
    getBookingById,
    deleteBooking,
    generateSeats,
    getAllSeatsByEvents
}