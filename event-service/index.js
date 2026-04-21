require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig')
const eventsAdminRouter = require('./routes/eventsAdminRouter');
const seatsAdminRouter = require('./routes/seatsAdminRouter');
const seatRouter = require('./routes/seatsRouter')
const jwtFilter = require('./middleware/jwtFilterMiddleware')
const logMiddleware = require('./middleware/logMiddleware')
const roleFilter = require('./middleware/roleFilterMiddleware')


const app = express();
const PORT = process.env.EVENT_SERVICE_PORT || 3002;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(jwtFilter)
app.use(logMiddleware)
app.use('/api/admin/events',roleFilter('Admin'),eventsAdminRouter);
app.use('/api/admin/seats', roleFilter('Admin'), seatsAdminRouter)
app.use('/api/seats', seatRouter)







app.listen(PORT, () => {
    console.log(`Event service started on port ${PORT}`);
});
