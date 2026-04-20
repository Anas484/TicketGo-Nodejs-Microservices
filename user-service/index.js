require('dotenv').config({ path: './.env' })
const express = require('express')
const cors = require('cors')
const { postgresConnect } = require('./config/postgresConfig')
const { addLog } = require('./config/logConfig')
const userRouter = require('./router/userRouter')


const app =  express();
const PORT = process.env.USER_SERVICE_PORT || 3001 
app.use(cors())
app.use(express.json())
app.use('/api/users',userRouter)

app.listen(PORT , () => {
    console.log("server started on " + PORT)
})