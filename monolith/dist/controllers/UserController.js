import { PrismaClient } from "@prisma/client";
import { lockSeats, areSeatsAvailable } from "../utils/BookingUtils.js";
import { userResponseMapper } from "../utils/Mapper.js";
const prisma = new PrismaClient();
const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json({ "data": events });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const getEventsByName = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            where: {
                name: {
                    contains: req.params.query
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
const createBooking = async (req, res) => {
    try {
        const { userId, eventId, seatNumbers } = req.body;
        await lockSeats({ userId, eventId, seatNumbers });
        //Check if seats are available
        const areSeatsAvailableResult = await areSeatsAvailable(Number(eventId), seatNumbers);
        if (areSeatsAvailableResult) {
            const booking = await prisma.booking.create({
                data: {
                    userId: Number(userId),
                    eventId: Number(eventId),
                    seatNumbers: seatNumbers
                }
            });
            res.status(200).json({ "data": booking });
        }
        res.status(400).json({ "message": "Some seats are not available" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const getMyDetails = (req, res) => {
    try {
        const userId = req.user?.id;
        const user = prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        });
        if (!user) {
            res.status(404).json({ "message": "User not found" });
        }
        const userData = userResponseMapper(user);
        res.status(200).json({ "data": userData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
export { getAllEvents, getEventsByName, createBooking, getMyDetails };
//# sourceMappingURL=UserController.js.map