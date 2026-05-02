import { z } from 'zod';
export declare const UserZod: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export declare const EventRequest: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    date: z.ZodCoercedDate<unknown>;
    location: z.ZodString;
    capacity: z.ZodNumber;
}, z.core.$strip>;
export declare const EventResponse: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    date: z.ZodDate;
    location: z.ZodString;
    capacity: z.ZodNumber;
}, z.core.$strip>;
export declare const updateEventsRequest: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodDate>;
    location: z.ZodOptional<z.ZodString>;
    capacity: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=AdminZod.d.ts.map