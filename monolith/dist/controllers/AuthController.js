import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/JwtUtil.js";
const prisma = new PrismaClient();
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let enterRole;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === "user") {
            enterRole = Role.user;
        }
        else {
            enterRole = Role.admin;
        }
        await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                role: enterRole
            }
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = generateToken({ id: user.id.toString(), role: user.role.toString() });
        res.status(200).json({ message: "User logged in successfully", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export { signup, login };
//# sourceMappingURL=AuthController.js.map