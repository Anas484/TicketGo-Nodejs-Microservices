const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const getAllBookings = (req, res) => {
    try {
        const bookings = prisma.booking.findMany()
        if (!bookings) {
            res.status(200).json({"message":"No Bookings found"})
        }
        res.status(200).json({
            data : bookings
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({"message":"Error in server"})
    }
}



const getBookingById = (req, res) => {
    try {
        const id = req.params.id
        const booking = prisma.booking.findUnique({
            where :{
                id : id
            }
        })
        if (!booking) {
            res.status(200).res.status(200).json({"message":`No Bookings found with ${id} found`})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({"message":"Error in server"})
    }
}



module.exports = {
    getAllBookings,
    getBookingById
}