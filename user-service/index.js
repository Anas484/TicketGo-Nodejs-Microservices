const express = require('express')
const cors = require('cors')
const { postgresConnect } = require('./config/postgresConfig')
const { addLog } = require('./config/logConfig')
const {userRouter} = require('./router/userRouter')
const dotenv = require('dotenv')

const dt = dotenv.config()

const app =  express();

app.use(cors)
app.use('/api/users',userRouter)

app.listen(dt.parsed.USER_SERVICE_PORT , () => {
    console.log("server started on " + dt.parsed.USER_SERVICE_PORT)
})