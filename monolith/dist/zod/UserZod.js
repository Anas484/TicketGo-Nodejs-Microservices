import z from "zod";
export const bookSeatsSchema = z.object({
    eventId: z.number(),
    seatNumbers: z.array(z.string())
});
//# sourceMappingURL=UserZod.js.map