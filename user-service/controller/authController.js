require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { generateJWT } = require('../utils/jwtUtil');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const signUpUser = async (req,res) => {
    try {
        const { firstName,lastName , email, password , role} = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const encryptedPass = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: encryptedPass,
                role
            }
        });
        res.status(201).json({
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


const loginUser = async (req , res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = generateJWT(user);
    res.status(200).json({ 
        user:{
            email: user.email
        },
        token
     });
}





module.exports = {
    signUpUser,
    loginUser
}