require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const {sendSeatBooked} = require('../utils/rabbitmqQueues')

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const getCurrentUserDetails = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });
        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role

            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const bookTicket = async (req , res) => {
    try {
        console.log(req.body)
        await sendSeatBooked(req.body)
        res.status(200).json({"message":"sent the booking data"})
    } catch (error) {
        console.error(error)
        res.status(500).json({"message":"Server error"})
        
    }
    
}





module.exports = {
    getCurrentUserDetails,
    bookTicket
}




