import { z } from 'zod';
export const UserResponseSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    role: z.string()
});
export const EventRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    capacity: z.number()
});
export const EventResponseSchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    capacity: z.number()
});
export const updateEventsRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    capacity: z.number()
}).partial();
//# sourceMappingURL=AdminZod.js.map