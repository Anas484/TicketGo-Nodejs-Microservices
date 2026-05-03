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
export declare const jwtFilter: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=JwtFilterMiddleware.d.ts.map