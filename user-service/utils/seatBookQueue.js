const { getChannel } = require('../config/rabbitMQConfig');

const QUEUE = 'seat_booked';

async function publishSeatBooked(data) {
  const channel = getChannel();

  await channel.assertQueue(QUEUE, { durable: true });

  channel.sendToQueue(
    QUEUE,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );

  console.log('Seat booked event sent:', data);
}

module.exports = {
  publishSeatBooked,
};