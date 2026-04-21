require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
// const {random} = require('Math')


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });



const isSeatsAvailable = async (req , res) => {
    try {
        const {event_id , seats} = req.body
        const seatFilter = await prisma.seat.findMany({
            where:event_id,
            seat_number:{
                in:seats
            }
        });
        const seatMap = new Map();  
        seatFilter.forEach(seat => {
            seatMap.set(seat.seat_number, seat.is_available)
        });
        res.status(200).json({
            data:seatMap
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}




module.exports = {
    isSeatsAvailable
}