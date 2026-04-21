require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

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





module.exports = {
    getCurrentUserDetails
}




