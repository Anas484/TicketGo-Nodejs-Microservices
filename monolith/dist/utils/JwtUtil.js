import "dotenv/config";
import jwt from "jsonwebtoken";
import { JwtPayloadSchema } from "../zod/AuthZod.js";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const generateToken = (payload) => {
    const parsed = JwtPayloadSchema.safeParse(payload);
    if (!parsed.success) {
        throw new Error("Invalid payload");
    }
    return jwt.sign(parsed.data, SECRET_KEY, { expiresIn: "1d" });
};
//# sourceMappingURL=JwtUtil.js.map