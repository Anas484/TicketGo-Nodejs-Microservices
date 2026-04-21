require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwtFilter = require('./middleware/jwtFilterMiddleware') 
const allowRoles = require('./middleware/roleFilterMiddleware') 
const adminRouter = require('./router/adminRouter')
const authRouter = require('./router/authRouter')
const userRouter = require('./router/userRouter')
const logMiddleware = require('./middleware/logMiddleware')

console.log('Process env USER_SERVICE_PORT:', process.env.USER_SERVICE_PORT)
const app =  express();
const PORT = process.env.USER_SERVICE_PORT
// app.use(cors())
app.use(express.json())
app.use(logMiddleware)
app.use('/api/users/auth',authRouter)
app.use('/api/admin/users',jwtFilter, allowRoles('Admin'),adminRouter)
app.use('/api/users',jwtFilter,allowRoles('Admin','User'),userRouter)

app.listen(PORT , () => {
    console.log("server started on " + PORT)
})