import type { User } from "@prisma/client";
export declare const usersResponseMapper: (users: User[]) => {
    firstName: string;
    lastName: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const userResponseMapper: (user: User) => {
    firstName: string;
    lastName: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
//# sourceMappingURL=Mapper.d.ts.map