const { Router } = require('express');

const userRouter = Router();

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/userController');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;