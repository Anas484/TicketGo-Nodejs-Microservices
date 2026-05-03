import { z } from 'zod';
export declare const signUpRequestSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const signUpResponseSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const loginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    token: z.ZodString;
}, z.core.$strip>;
export declare const JwtPayloadSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=AuthZod.d.ts.map