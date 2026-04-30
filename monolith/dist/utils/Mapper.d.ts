import type { User } from "@prisma/client";
export declare const usersResponseMapper: (users: User[]) => {
    firstName: string;
    lastName: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    id: number;
}[];
export declare const userResponseMapper: (user: User) => {
    firstName: string;
    lastName: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    id: number;
};
//# sourceMappingURL=Mapper.d.ts.map