import type { Request, Response } from "express";
declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { signup, login };
//# sourceMappingURL=AuthController.d.ts.map