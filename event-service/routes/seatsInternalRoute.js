const { Router } = require('express')
const { getAllSeatsStatus, updateSeatsStatus } = require('../controller/seatsInternalController')



const seatsInternalRouter = Router()

seatsInternalRouter.get('/check-seats-status', getAllSeatsStatus)
seatsInternalRouter.patch('/update-seats-status', updateSeatsStatus)


module.exports = seatsInternalRouter