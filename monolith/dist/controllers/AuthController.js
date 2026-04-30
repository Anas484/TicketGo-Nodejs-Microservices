import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const signup = async (req, res) => {
    try {
        const { fistName, lastName, email, password, role } = req.body;
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
                fistName: fistName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                roles: enterRole
            }
        });
    }
    catch (error) {
    }
};
//# sourceMappingURL=AuthController.js.map