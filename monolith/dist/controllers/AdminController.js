import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// get All userss
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ "data": users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({ "data": user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
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
const createEvent = async (req, res) => {
    try {
        const { name, description, date, location, capacity } = req.body;
        const event = await prisma.event.create({
            data: {
                name: name,
                description: description,
                date: date,
                location: location,
                capacity: capacity
            }
        });
        res.status(201).json({ "data": event });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const updateEvent = async (req, res) => {
    try {
        const data = req.body;
        const event = await prisma.event.update({
            where: {
                id: Number(req.params.id)
            },
            data: data
        });
        res.status(200).json({ "data": event });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const deleteEvent = async (req, res) => {
    try {
        const event = await prisma.event.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({ "data": event });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.status(200).json({ "data": bookings });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const getBookingById = async (req, res) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({ "data": booking });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
const deleteBooking = async (req, res) => {
    try {
        const booking = await prisma.booking.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json({ "data": booking });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
export { getAllUsers, getUserById, getAllEvents, createEvent, updateEvent, deleteEvent, getAllBookings, getBookingById, deleteBooking };
//# sourceMappingURL=AdminController.js.map