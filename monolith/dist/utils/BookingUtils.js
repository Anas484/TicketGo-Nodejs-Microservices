import { getRedisClient } from "../configs/redisConfig.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function lockSeats({ userId, eventId, seatNumbers }) {
    const redisClient = getRedisClient();
    for (const seat of seatNumbers) {
        const key = `seat_lock:${eventId}:${seat}`;
        const result = await redisClient.set(key, userId, {
            NX: true,
            EX: 300,
        });
        if (!result) {
            console.log(`Seat ${seat} is already booked/locked`);
        }
    }
    console.log('Seats locked');
}
const areSeatsAvailable = async (eventId, seatNumbers) => {
    try {
        const isAvailable = await prisma.seat.findMany({
            where: {
                eventId: Number(eventId),
                seatNumber: {
                    in: seatNumbers
                },
            },
            select: {
                seatNumber: true,
                isAvailable: true
            }
        });
        const notAvailableSeats = isAvailable.filter(seat => seat.isAvailable == false);
        if (notAvailableSeats) {
            for (const seat of notAvailableSeats)
                console.log(`seat ${seat.seatNumber} is not avalable`);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Error checking seat availability:', error);
        return false;
    }
};
export { lockSeats, areSeatsAvailable };
//# sourceMappingURL=BookingUtils.js.map