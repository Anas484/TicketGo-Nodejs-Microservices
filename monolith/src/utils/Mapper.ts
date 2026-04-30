import type { User } from "@prisma/client";



export const usersResponseMapper = (users : User[]) => {
    const result = users.map(user => {
        const{password, ...result} = user
        return result
    })
    return result
}

 
export const userResponseMapper = (user: User) => {
    const {password, ...result} = user
    return result;
}