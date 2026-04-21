const { Router } = require('express');

const userRouter = Router();

const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/userController');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;