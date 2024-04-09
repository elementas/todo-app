const { Router } = require('express');
const controller = require('./listsController');
const validator = require('../../validator');
const paramsSchema = require('./schemas/params.json');
const listSchema = require('./schemas/list.json');

const router = new Router();

validator.addSchema(paramsSchema, 'lists/params');
validator.addSchema(listSchema, 'lists/list');

router
    .route('/')
    .get(controller.getLists)
    .post(
        validator.getRequestValidator('lists/list', 'body'),
        controller.createList
    );

router
    .route('/:listId')
    .all(validator.getRequestValidator('lists/params', 'params'))
    .get(controller.getList)
    .put(
        validator.getRequestValidator('lists/list', 'body'),
        controller.updateList
    )
    .delete(controller.deleteList);

module.exports = router;
