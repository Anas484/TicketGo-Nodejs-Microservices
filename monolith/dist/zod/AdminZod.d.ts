import { z } from 'zod';
export declare const UserResponseSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const EventRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    date: z.ZodCoercedDate<unknown>;
    location: z.ZodString;
    capacity: z.ZodNumber;
}, z.core.$strip>;
export declare const EventResponseSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    date: z.ZodDate;
    location: z.ZodString;
    capacity: z.ZodNumber;
}, z.core.$strip>;
export declare const updateEventsRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodDate>;
    location: z.ZodOptional<z.ZodString>;
    capacity: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=AdminZod.d.ts.map