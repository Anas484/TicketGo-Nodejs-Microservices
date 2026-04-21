const { Router } = require('express');
const seatsRouter = Router();
const { getSeatsByEventId } = require('../controller/seatsController')


seatsRouter.get('/:id',getSeatsByEventId)



module.exports = seatsRouter