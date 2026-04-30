import type { BookingRequest } from "../interfaces/UserInterface.js";
declare function lockSeats({ userId, eventId, seatNumbers }: BookingRequest): Promise<void>;
declare const areSeatsAvailable: (eventId: Number, seatNumbers: string[]) => Promise<boolean>;
export { lockSeats, areSeatsAvailable };
//# sourceMappingURL=BookingUtils.d.ts.map