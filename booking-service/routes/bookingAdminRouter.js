const {Router} = require('express')
const {getAllBookings, getBookingById} = require('../controller/bookingAdminController')



const bookingAdminRouter = Router()


bookingAdminRouter.get('/', getAllBookings)
bookingAdminRouter.get('/:id', getBookingById)

module.exports = bookingAdminRouter