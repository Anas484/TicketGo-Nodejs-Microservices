import {z} from 'zod'



export const UserZod = z.object({
    firstName: z.string(),
    lastName :z.string(),
    email: z.string(),
    role : z.string()
})


export const EventRequest = z.object({
    name:z.string(),
    description:z.string(),
    date: z.coerce.date(),
    location: z.string(),
    capacity: z.number()
})


export const EventResponse = z.object({
    name:z.string(),
    description:z.string(),
    date: z.date(),
    location: z.string(),
    capacity: z.number()
})


export const updateEventsRequest = z.object({
    name:z.string(),
    description:z.string(),
    date: z.date(),
    location: z.string(),
    capacity: z.number()
}).partial();