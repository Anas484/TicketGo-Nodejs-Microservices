declare function lockSeats(userId: string, eventId: string, seatNumbers: string[]): Promise<void>;
declare const seatsPriceSum: (eventId: number, seatNumbers: string[]) => Promise<number>;
declare const areSeatsAvailable: (eventId: Number, seatNumbers: string[]) => Promise<boolean>;
export declare const updateSeatsInternal: (eventId: number, seatNumbers: string[]) => Promise<void>;
export { lockSeats, areSeatsAvailable, seatsPriceSum };
//# sourceMappingURL=BookingUtils.d.ts.map