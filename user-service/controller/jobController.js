const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getAlljobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAlljobs
};