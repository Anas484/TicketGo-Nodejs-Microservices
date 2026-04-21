const { getChannel } = require('../config/rabbitMQConfig');


async function sendSeatBooked(data) {
  const channel = getChannel();

  channel.sendToQueue(
    'seat_booked',
    Buffer.from(JSON.stringify(data))
  );
}


module.exports = {
    sendSeatBooked
}