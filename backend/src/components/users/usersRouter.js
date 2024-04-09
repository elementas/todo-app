const { Router } = require('express');
const controller = require('./usersController');
const validator = require('../../validator');
const paramsSchema = require('./schemas/params.json');

const router = new Router();

validator.addSchema(paramsSchema, 'users/params');

router.route('/').get(controller.getUsers).post(controller.createUser);

router
    .route('/:userId')
    .all(validator.getRequestValidator('users/params', 'params'))
    .get(controller.getUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;
