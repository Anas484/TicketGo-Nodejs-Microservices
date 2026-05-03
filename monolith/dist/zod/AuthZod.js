import { z } from 'zod';
export const signUpRequestSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().min(1, "Role is required")
});
export const signUpResponseSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    role: z.string()
});
export const loginRequestSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string()
});
export const loginResponseSchema = z.object({
    id: z.number(),
    token: z.string()
});
export const JwtPayloadSchema = z.object({
    id: z.string(),
    role: z.string()
});
//# sourceMappingURL=AuthZod.js.map