require('dotenv').config();
const express = require('express');
const eventsAdminRouter = require('./routes/eventsAdminRouter');
const jwtFilter = require('./middleware/jwtFilterMiddleware')
const logMiddleware = require('./middleware/logMiddleware')
const roleFilter = require('./middleware/roleFilterMiddleware')


const app = express();
const PORT = process.env.EVENT_SERVICE_PORT || 3002;

app.use(jwtFilter)
app.use(logMiddleware)
app.use('/api/admin/events',roleFilter('Admin'),eventsAdminRouter);






app.listen(PORT, () => {
    console.log(`Event service started on port ${PORT}`);
});
