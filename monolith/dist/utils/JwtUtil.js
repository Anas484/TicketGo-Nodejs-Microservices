import "dotenv/config";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_KEY;
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};
export default generateToken;
//# sourceMappingURL=JwtUtil.js.map