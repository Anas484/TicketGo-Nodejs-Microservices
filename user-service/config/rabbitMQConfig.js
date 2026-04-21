const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost:5672');

  channel = await connection.createChannel();

  await channel.assertQueue('seat_booked');

  console.log('RabbitMQ connected');
}

function getChannel() {
  if (!channel) {
    throw new Error('RabbitMQ not initialized');
  }
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };