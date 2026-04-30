export const usersResponseMapper = (users) => {
    const result = users.map(user => {
        const { password, ...result } = user;
        return result;
    });
    return result;
};
export const userResponseMapper = (user) => {
    const { password, ...result } = user;
    return result;
};
//# sourceMappingURL=Mapper.js.map