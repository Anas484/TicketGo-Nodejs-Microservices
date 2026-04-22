require('dotenv').config();
const { connectRabbitMQ } = require('../config/rabbitMQConfig')
const { getChannel } = require('../config/rabbitMQConfig');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const {getRedisClient} = require('../config/redisConfig')
const { connectRedis } = require('../config/redisConfig')
const axios = require('axios')


async function start() {
  await connectRedis();       
  await connectRabbitMQ();    
  await startBookSeatConsumer();
}

start();


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });
const redis = getRedisClient();


async function lockSeats(user_id,event_id, seats) {
  for (const seat of seats) {
    const key = `seat_lock:${event_id}:${seat}`;

    const result = await redis.set(key, user_id, {
      NX: true,
      EX: 300,
    });     
    if (!result) {
      throw new Error(`Seat ${seat} is already booked/locked`);
    }
  }
  console.log('Seats locked');
}

const startBookSeatConsumer = async(req , res) => {
    console.log("started Consuming")
    const channel = getChannel()
    await channel.purgeQueue('seat_booked')
    channel.consume('seat_booked', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const {user_id, event_id , seats} = data
    lockSeats(user_id,event_id,seats)
    await prisma.booking.create({
        data:{
            userId: user_id,
            eventId: event_id,
            seats: seats
        }
    })
    console.log("created booking")
    
});


}


module.exports = {
    startBookSeatConsumer
}