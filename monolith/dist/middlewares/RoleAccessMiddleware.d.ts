import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
export declare const roleAccessMiddleware: (role: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=RoleAccessMiddleware.d.ts.map