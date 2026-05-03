import { redis } from "../configs/redisConfig.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function lockSeats(userId, eventId, seatNumbers) {
    //   const redis = getredis();
    for (const seat of seatNumbers) {
        const key = `seat_lock:${eventId}:${seat}`;
        const result = await redis.set(key, userId, {
            nx: true,
            ex: 300,
        });
        if (!result) {
            console.log(`Seat ${seat} is already booked/locked`);
        }
    }
    console.log('Seats locked');
}
const seatsPriceSum = async (eventId, seatNumbers) => {
    try {
        const prices = await prisma.seat.findMany({
            where: {
                eventId: eventId,
                seatNumber: {
                    in: seatNumbers
                }
            },
            select: {
                price: true
            }
        });
        return prices.reduce((sum, seat) => sum + seat.price, 0);
    }
    catch (error) {
        console.error('Error getting seats price sum:', error);
        return 0;
    }
};
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
export { lockSeats, areSeatsAvailable, seatsPriceSum };
//# sourceMappingURL=BookingUtils.js.map