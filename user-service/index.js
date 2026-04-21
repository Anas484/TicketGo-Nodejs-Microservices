require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')



console.log('Process env USER_SERVICE_PORT:', process.env.USER_SERVICE_PORT)
const app =  express();
const PORT = process.env.USER_SERVICE_PORT
// app.use(cors())
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/users/auth',authRouter)

app.listen(PORT , () => {
    console.log("server started on " + PORT)
})