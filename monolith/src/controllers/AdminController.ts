import type{Request, Response} from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


// get All userss
export const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({"data": users})
    }catch (error){
        console.log(error)
        res.status(500).json({"message":`Server error ${error}`});
    }
}
