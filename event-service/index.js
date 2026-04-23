require('dotenv').config();
const express = require('express');
// const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig')
const eventsAdminRouter = require('./routes/eventsAdminRouter');
const seatsAdminRouter = require('./routes/seatsAdminRouter');
const seatRouter = require('./routes/seatsRouter')
const jwtFilter = require('./middleware/jwtFilterMiddleware')
const logMiddleware = require('./middleware/logMiddleware')
const roleFilter = require('./middleware/roleFilterMiddleware')
const seatsInternalRouter = require('./routes/seatsInternalRoute')

const app = express();
const PORT = process.env.EVENT_SERVICE_PORT || 3002;
app.use(express.json());
app.use('/api/seats/internal', seatsInternalRouter)
app.use(jwtFilter)
app.use(logMiddleware)
app.use('/api/events/admin',roleFilter('Admin'),eventsAdminRouter);
app.use('/api/seats/admin', roleFilter('Admin'), seatsAdminRouter)
app.use('/api/seats', seatRouter)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`Event service started on port ${PORT}`);
});
