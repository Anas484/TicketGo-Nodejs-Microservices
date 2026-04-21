const { Router } = require('express')
const userRouter = Router()
const { getCurrentUserDetails } = require('../controller/userController')



userRouter.get('/', getCurrentUserDetails)



module.exports = userRouter