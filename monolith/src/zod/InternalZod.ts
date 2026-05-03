import {z} from 'zod'




export const updateSeatStatusSchema  = z.object({
    eventId:z.number(),
    seatNumber:z.array(z.string())
})
