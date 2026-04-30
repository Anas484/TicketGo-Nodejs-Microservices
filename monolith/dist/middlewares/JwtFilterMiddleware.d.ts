import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import type { User } from "../interfaces/AuthInterface.js";
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
declare const jwtFilter: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default jwtFilter;
//# sourceMappingURL=JwtFilterMiddleware.d.ts.map