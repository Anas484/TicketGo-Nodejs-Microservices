declare function lockSeats(userId: string, eventId: string, seatNumbers: string[]): Promise<void>;
declare const areSeatsAvailable: (eventId: Number, seatNumbers: string[]) => Promise<boolean>;
export declare const updateSeatsInternal: (eventId: number, seatNumbers: string[]) => Promise<void>;
export { lockSeats, areSeatsAvailable };
//# sourceMappingURL=BookingUtils.d.ts.map