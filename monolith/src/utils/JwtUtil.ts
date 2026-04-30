import "dotenv/config"
import jwt from "jsonwebtoken";
import type {JwtPayload} from "../interfaces/JwtInterface.js"

const SECRET_KEY : any = process.env.JWT_SECRET_KEY

export const generateToken = (payload : JwtPayload) : string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}



