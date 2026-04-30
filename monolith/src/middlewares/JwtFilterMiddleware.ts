import "dotenv/config"
import type { Request, Response , NextFunction} from "express";
import jwt from 'jsonwebtoken'
import type{ User } from "../interfaces/AuthInterface.js";
import type { JwtPayload } from "../interfaces/JwtInterface.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
const jwtFilter =  (req:Request, res:Response, next:NextFunction) =>{
    const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
}
export default jwtFilter;