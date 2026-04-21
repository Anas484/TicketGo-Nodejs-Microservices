require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const getAllEvents = async(req, res) => {
    try {
        const events = await prisma.events.findMany();
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
        const event = await prisma.events.findUnique({
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
        const event = await prisma.events.create({
            data: {
                name : name,
                performers : performers,
                description : description,
                startTime : startTime,
                endTime : endTime,
                location : location,
                date : date,
                capacity : capacity
            }
        });
        res.status(201).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteEvent = (req , res) => {
    try {
        const id = req.params.id
        prisma.events.delete(id)
        res.status(200).json({message : `Deleted event with id : ${id}`})
    } catch (error) {
        console.error(error)
        res.status(500).json({message : 'Internal server error'})
    }
}


const updateEvent = (req , res) => {
    try {
        const id = req.params.id 
        prisma.events.update({
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