import { response } from "express";
import { PrismaClient } from "@prisma/client";
import { userResponseMapper, usersResponseMapper } from "../utils/Mapper.js";
const prisma = new PrismaClient();
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        const userResponse = usersResponseMapper(users);
        res.status(200).json({ "data": userResponse });
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
        if (user) {
            const response = userResponseMapper(user);
            res.status(200).json({ "data": response });
        }
        res.status(400).json({ "message": "user not found" });
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
const generateSeats = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const capacity = await prisma.event.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                capacity: true
            }
        });
        const seats = await prisma.seat.createMany({
            data: Array.from({ length: Number(capacity) }, (_, i) => ({
                eventId: id,
                seatNumber: `${i + 1}`,
                price: Number((Math.random() * 500 + 100).toFixed(2)),
                isAvailable: true
            }))
        });
        res.status(200).json({ "data": seats });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": `Server error ${error}` });
    }
};
export { getAllUsers, getUserById, getAllEvents, createEvent, updateEvent, deleteEvent, getAllBookings, getBookingById, deleteBooking, generateSeats };
//# sourceMappingURL=AdminController.js.map