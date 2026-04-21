require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const generateJWT = (user) => {
    return jwt.sign(
        {id: user.id,
        role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1d'});
    };



module.exports = {
    generateJWT
}