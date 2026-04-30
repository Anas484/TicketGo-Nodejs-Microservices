import "dotenv/config"
import jwt from "jsonwebtoken";
import type {JwtPayload} from "../interfaces/JwtInterface.js"

const SECRET_KEY : string = process.env.JWT_KEY as string

export const generateToken = (payload : JwtPayload) : string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}



