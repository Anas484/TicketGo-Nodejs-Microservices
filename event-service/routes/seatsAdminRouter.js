const { Router } = require('express');
const seatsAdminRouter = Router();
const { generateSeats } = require('../controller/seatsAdminController')


seatsAdminRouter.post("/generate-seats/:id", generateSeats)



module.exports = seatsAdminRouter