import { z } from 'zod';
export declare const signUpRequest: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const signUpResponse: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const loginRequest: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginResponse: z.ZodObject<{
    id: z.ZodNumber;
    token: z.ZodString;
}, z.core.$strip>;
export declare const JwtPayload: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=AuthZod.d.ts.map