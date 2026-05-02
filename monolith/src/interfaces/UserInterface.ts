


export interface BookingRequest {
    userId: string;
    eventId: string;
    seatNumbers: string[];
}



export interface UserResponce {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}