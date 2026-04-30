import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
declare const roleAccessMiddleware: (role: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default roleAccessMiddleware;
//# sourceMappingURL=RoleAccessMiddleware.d.ts.map