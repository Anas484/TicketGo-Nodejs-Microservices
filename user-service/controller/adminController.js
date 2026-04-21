require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({
            users: users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getUserById = async (req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateUser = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteUser = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};