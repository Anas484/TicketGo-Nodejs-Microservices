const express = require('express')
const cors = require('cors')
const { postgresConnect } = require('./config/postgresConfig')
const { addLog } = require('./config/logConfig')
const dotenv = require('dotenv')

const dt = dotenv.config()

const app =  express();

postgresConnect(dt.parsed.POSTGRESS_URL)
.then(() => {
    console.log("Postgres Connected")
})
.catch((err) => {
    console.log("Error in postgress connection", err)
})

app.use(cors)
app.use(addLog)


app.listen(dt.parsed.USER_SERVICE_PORT , () => {
    console.log("server started on " + dt.parsed.USER_SERVICE_PORT)
})