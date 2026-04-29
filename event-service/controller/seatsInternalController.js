require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const seatsAdminRouter = require('../routes/seatsAdminRouter');
// const {random} = require('Math')


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });



const getAllSeatsStatus = async (req, res) => {
    try {
        const {eventId, seats} = req.body
        const result = await prisma.seat.findMany({
            where : {
                event_id: eventId,
                seat_number: {
                    in: seats
                }
                },
                select:{
                    seat_number: true,
                    is_available: true
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


const updateSeatsStatus = async (req, res) => {
    try {
         const { seats, event_id } = req.body;
        const result = await prisma.seat.updateMany({
            where:{
                event_id: event_id,
                seat_number: {
                    in: seats
                }
            },
            data:{
                is_available: false
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