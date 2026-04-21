const { Router } = require('express');
const eventsAdminRouter = Router();
const { getAllEvents, getEventById, createEvent, deleteEvent, updateEvent } = require('../controller/eventsAdminController')

eventsAdminRouter.get('/', getAllEvents);
eventsAdminRouter.get('/:id', getEventById);
eventsAdminRouter.post('/', createEvent);
eventsAdminRouter.delete('/:id',deleteEvent);
eventsAdminRouter.patch('/:id',updateEvent);

module.exports = eventsAdminRouter;