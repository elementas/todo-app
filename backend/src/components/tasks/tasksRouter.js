const { Router } = require('express');
const taskController = require('./tasksController');
const validator = require('../../validator');
const paramsSchema = require('./schemas/params.json');
const taskSchema = require('./schemas/task.json');

const router = new Router({ mergeParams: true });

validator.addSchema(paramsSchema, 'tasks/params');
validator.addSchema(taskSchema, 'tasks/task');

router.use(validator.getRequestValidator('tasks/params', 'params'));

router
    .route('/')
    .get(taskController.getUnfinishedTasks)
    .post(
        validator.getRequestValidator('tasks/task', 'body'),
        taskController.createTask
    );

router.route('/finished').get(taskController.getFinishedTasks);

router
    .route('/:taskId')
    .put(
        validator.getRequestValidator('tasks/task', 'body'),
        taskController.updateTask
    )
    .delete(taskController.deleteTask);

module.exports = router;
