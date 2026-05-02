import type { Request, Response } from "express";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/JwtUtil.js";
import {loginRequest,loginResponse,signUpRequest,signUpResponse} from "../zod/AuthZod.js"
import { prisma } from "../utils/PrismaConn.js"


const signup = async (req: Request, res: Response) => {
    try {
        const userRequest = signUpRequest.safeParse(req.body);
        if (!userRequest.success) {
            return res.status(400).json({message: "All fields are required"});
        }
        const {firstName, lastName, email, password, role} = userRequest.data;
        const isExist = await prisma.user.findUnique({
            where: {
                email: email
            },
            select:{
                email: true
            }
        })
        if (isExist) {
            return res.status(400).json({message: "User already exists"});
        }
        let enterRole;
        const hashedPassword = await bcrypt.hash(password, 10)
        if (role === "admin") {
            enterRole = Role.admin
        }
        enterRole = Role.user
        
        await prisma.user.create({
            data:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashedPassword,
                role: enterRole
            }
        })
        return res.status(201).json({message: "User created successfully", ...signUpResponse.safeParse({firstName, lastName, email, role}).data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}



const login = async (req: Request, res: Response) => {
    try {
        const userRequest = loginRequest.safeParse(req.body);
        if (!userRequest.success) {
            return res.status(400).json({message: "Email and password are required"});
        }
        const {email, password} = userRequest.data
        const user = await prisma.user.findUnique({
            where: {
                email:email
            }
        })
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = generateToken({id: user.id.toString(), role: user.role.toString()});
        return res.status(200).json({message: "User logged in successfully", ...loginResponse.safeParse({id: user.id, token}).data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export {signup, login}