require('dotenv').config();
const jwt = require('jsonwebtoken')


const jwtFilter = (req, res, next) => {
    if (req.path.startsWith('/api/seats/internal')) {
        next();
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = jwtFilter;