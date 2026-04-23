require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const getAllEvents = async(req, res) => {
    try {
        const events = await prisma.event.findMany();
        if (!events) {
            return res.status(401).json({ message: 'No events found' });
        }
        res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const getEventById = async(req, res) => {
    try {
        const id = req.params.id;
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!event) {
            return res.status(401).json({ message: 'Event not found' });
        }
        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const createEvent = async(req, res) => {
    try {
        const { name, performers, description, startTime, endTime, location ,date, capacity} = req.body;
        const event = await prisma.event.create({
            data: {
                name : name,
                performers : performers,
                description : description,
                startTime : new Date(startTime).toISOString(),
                endTime : new Date(endTime).toISOString(),
                location : location,
                date : new Date(date).toISOString(),
                capacity : capacity
            }
        });
        res.status(201).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteEvent = async (req , res) => {
    try {
        const id = req.params.id
        await prisma.event.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({message : `Deleted event with id : ${id}`})
    } catch (error) {
        console.error(error)
        res.status(500).json({message : 'Internal server error'})
    }
}


const updateEvent = async (req , res) => {
    try {
        const id = req.params.id 
        await prisma.event.update({
            where:{
                id: parseInt(req.params.id)
            },
            data : req.body
        })
        res.status(200).json({message : `Updated event with id : ${id}`})
    } catch (error) {
        console.error(error)
        res.status(500).json({message : 'Internal server error'})
    }
}


module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    deleteEvent,
    updateEvent
}