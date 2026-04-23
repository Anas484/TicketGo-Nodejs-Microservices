require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const seatsAdminRouter = require('../routes/seatsAdminRouter');
// const {random} = require('Math')


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });



const getAllSeatsStatus = (req, res) => {
    try {
        const seats = req.body
        const result = prisma.seat.findMany({
            where : {
                eventId: seats.eventId,
                seatNumber: {
                    in: seats.seats
                },
                select:{
                    seatNumber: true,
                    status: true
                }
            }
        })
        if (!result) {
            return res.status(404).json({ message: 'Seats not found' })
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


const updateSeatsStatus = (req, res) => {
    try {
         const { seats, event_id } = req.body;
        const result = prisma.seat.updateMany({
            where:{
                event_id: event_id,
                seatNumber: {
                    in: seats
                }
            },
            data:{
                status: false
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}





module.exports = {
    getAllSeatsStatus,
    updateSeatsStatus
}