const { Router } = require('express');
const authRouter = require('./components/auth/authRouter');
const authController = require('./components/auth/authController');
const listsRouter = require('./components/lists/listsRouter');
const tasksRouter = require('./components/tasks/tasksRouter');
const usersRouter = require('./components/users/usersRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/lists', authController.isLoggedIn, listsRouter);
router.use('/lists/:listId/tasks', authController.isLoggedIn, tasksRouter);
router.use(
    '/users',
    authController.isLoggedIn,
    authController.isAdmin,
    usersRouter
);

module.exports = router;
