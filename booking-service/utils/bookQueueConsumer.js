const { getChannel } = require('../config/rabbitMQConfig');

const QUEUE = 'seat_booked';

async function consumeSeatBooked() {
    console.log("started listening")
  const channel = getChannel();

  await channel.assertQueue(QUEUE, { durable: true });

  channel.consume(QUEUE, async (msg) => {
    if (msg !== null) {
      try {
        const data = JSON.parse(msg.content.toString());

        console.log('Received:', data)

        channel.ack(msg);
      } catch (err) {
        console.error('Error processing message:', err);

        channel.nack(msg, false, false);
      }
    }
  });
}

module.exports = {
  consumeSeatBooked,
};