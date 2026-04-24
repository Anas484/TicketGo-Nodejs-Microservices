
require('dotenv').config();
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const ratelimit = require('express-rate-limit');


const limiter = ratelimit({
  windowMs: 10 * 60 * 1000, 
  max: 100 
});

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

app.use(limiter);

app.use("/users", createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
}));

app.use("/events", createProxyMiddleware({
  target: process.env.EVENT_SERVICE_URL,
  changeOrigin: true,
}));

app.use("/bookings", createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL,
  changeOrigin: true,
}));

// app.use("/payments", createProxyMiddleware({
//   target: process.env.PAYMENT_SERVICE_URL,
//   changeOrigin: true,
// }));


app.listen(PORT, () => {
    console.log(`API Gateway service started on port ${PORT}`);
});