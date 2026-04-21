const { Router } = require('express');

const authRouter = Router();

const { signUpUser, loginUser } = require('../controller/authController')


authRouter.post('/register', signUpUser)
authRouter.post('/login',loginUser)





module.exports = authRouter