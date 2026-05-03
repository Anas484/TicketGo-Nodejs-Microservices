import { getRedisClient } from "../configs/redisConfig.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function lockSeats(userId, eventId, seatNumbers) {
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
        for (const seat of isAvailable) {
            if (seat.isAvailable == false) {
                console.log(`Seat ${seat.seatNumber} is not available`);
                return false;
            }
        }
        return true;
    }
    catch (error) {
        console.error('Error checking seat availability:', error);
        return false;
    }
};
export const updateSeatsInternal = async (eventId, seatNumbers) => {
    try {
        if (!eventId && !seatNumbers) {
            throw new Error("No eventId and seats provide to update");
        }
        await prisma.seat.updateMany({
            where: {
                eventId: eventId,
                seatNumber: {
                    in: seatNumbers
                }
            },
            data: {
                isAvailable: false
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
export { lockSeats, areSeatsAvailable };
//# sourceMappingURL=BookingUtils.js.map