const { Router } = require('express')
const userRouter = Router()
const { getCurrentUserDetails, bookTicket } = require('../controller/userController')



userRouter.get('/', getCurrentUserDetails)
userRouter.post('/book',bookTicket)


module.exports = userRouter