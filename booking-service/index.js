require('dotenv').config();
const express = require('express');
const  jwtFilterMiddleware = require('./middleware/jwtFilterMiddleware')
const logMiddleware = require('./middleware/logMiddleware')
const { startBookSeatConsumer } = require('./controller/bookingController')
const { connectRabbitMQ } = require('./config/rabbitMQConfig');
const { connectRedis } = require('./config/redisConfig');

const app = express();
const PORT = process.env.BOOKING_SERVICE_PORT || 3003;
async function start() {
//   await connectRedis();       // ✅ FIRST
  await connectRabbitMQ();    // optional
  await startBookSeatConsumer();
}

start();
// startBookSeatConsumer();

app.use(jwtFilterMiddleware)
app.use(logMiddleware)


app.listen(PORT, () => {
    console.log(`Booking service started on port ${PORT}`);
});
