require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { parse } = require('dotenv');
// const {random} = require('Math')


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const generateSeats = async (req, res) => {
    try {
        const eventId = req.params.id
        const { seatsPerRow = 10 } = req.body;
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(eventId)
            }
        });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const numberOfSeats = event.capacity
        if (!eventId || !numberOfSeats) {
            return res.status(400).json({ message: 'Event ID and number of seats are required' });
        }
        const data = [];

        const getPriceByRow = (rowIndex) => {
            if (rowIndex === 0) return 100; // A (VIP)
            if (rowIndex === 1) return 80;  // B
            if (rowIndex === 2) return 60;  // C
            return 40;                     
        };

        for (let i = 0; i < numberOfSeats; i++) {
            const rowIndex = Math.floor(i / seatsPerRow);
            const seatIndex = (i % seatsPerRow) + 1;

            const rowLetter = String.fromCharCode(65 + rowIndex);

            data.push({
                event_id: parseInt(eventId),
                seat_number: `${rowLetter}${seatIndex}`,
                price: getPriceByRow(rowIndex),
                is_available: true
            });
        }
        const result = await prisma.seat.createMany({
            data
        });
        res.status(201).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
    generateSeats
}