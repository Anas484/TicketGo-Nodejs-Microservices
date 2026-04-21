const { Router } = require('express');
const eventsAdminRouter = Router();
const { getAllEvents, getEventById, createEvent } = require('../controller/adminEventsController');

eventsAdminRouter.get('/', getAllEvents);
eventsAdminRouter.get('/:id', getEventById);
eventsAdminRouter.post('/', createEvent);

module.exports = eventsAdminRouter;