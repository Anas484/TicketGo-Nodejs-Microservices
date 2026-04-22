const fs = require('fs').promises

const logMiddleware = async (req, res, next) => {
  const log = `${new Date().toISOString()},${req.method},${req.originalUrl},${req.ip}`;
  await fs.appendFile('booking-service-log.csv', log + '\n', 'utf8');
  
  next();
};

module.exports = logMiddleware;