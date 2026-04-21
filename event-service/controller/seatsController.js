require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
// const {random} = require('Math')


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const getSeatsByEventId = async (req , res) => {
    try {
        const id = req.params.id;
        const seats = await prisma.seat.findMany({
            where: {
                event_id: Number(id)
            }
        });
        res.status(200).json({ 
            seats : seats.map(seat => ({
                    seat_number: seat.seat_number,
                    price: seat.price,
                    is_available: seat.is_available
                }))
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}






module.exports = {
    getSeatsByEventId
}