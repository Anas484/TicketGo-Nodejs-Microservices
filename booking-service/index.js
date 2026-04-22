require('dotenv').config();
const express = require('express');
const  jwtFilterMiddleware = require('./middleware/jwtFilterMiddleware')
const logMiddleware = require('./middleware/logMiddleware')

const app = express();
const PORT = process.env.BOOKING_SERVICE_PORT || 3003;

app.use(jwtFilterMiddleware)
app.use(logMiddleware)


app.listen(PORT, () => {
    console.log(`Booking service started on port ${PORT}`);
});
