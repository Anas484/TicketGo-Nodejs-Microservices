const { Router } = require('express');

const adminRouter = Router();

const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/adminController');

adminRouter.get('/', getAllUsers);
adminRouter.get('/:id', getUserById);
adminRouter.put('/:id', updateUser);
adminRouter.delete('/:id', deleteUser);

module.exports = adminRouter;