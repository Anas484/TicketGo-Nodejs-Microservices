import "dotenv/config";
export const roleAccessMiddleware = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!(role === user.role.toString().toLowerCase().trim())) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
//# sourceMappingURL=RoleAccessMiddleware.js.map