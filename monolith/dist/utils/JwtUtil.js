import "dotenv/config";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};
//# sourceMappingURL=JwtUtil.js.map