require('dotenv').config();
const { connectRabbitMQ } = require('../config/rabbitMQConfig')
const { getChannel } = require('../config/rabbitMQConfig');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const startBookSeatConsumer = async(req , res) => {
    console.log("started Consuming")
    await connectRabbitMQ();
    const channel = getChannel()
    await channel.purgeQueue('seat_booked')
    channel.consume('seat_booked', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const {user_id, event_id , seats} = data
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