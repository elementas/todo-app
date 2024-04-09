const logger = require('../../logger');
const RequestError = require('../../RequestError');
const { STATUS } = require('../../constants');
const defaultErrors = require('../../errors');
const tasksDAO = require('./tasksDAO');

exports.getUnfinishedTasks = async (req, res, next) => {
    try {
        const tasks = await tasksDAO.getUnfinishedUserTasks(
            req.session.user.app_user_id,
            req.params.listId
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: tasks || []
        });
    } catch (err) {
        logger.error('An error occurred while retrieving tasks:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.getFinishedTasks = async (req, res, next) => {
    try {
        const tasks = await tasksDAO.getFinishedUserTasks(
            req.session.user.app_user_id,
            req.params.listId
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: tasks || []
        });
    } catch (err) {
        logger.error('An error occurred while retrieving tasks:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const task = await tasksDAO.createUserTask(
            req.session.user.app_user_id,
            req.params.listId,
            req.body.label,
            req.body.description,
            req.body.due,
            req.body.finished
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: task || null
        });
    } catch (err) {
        logger.error('An error occurred while creating task:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await tasksDAO.updateUserTask(
            req.session.user.app_user_id,
            req.params.listId,
            req.params.taskId,
            req.body.label,
            req.body.description,
            req.body.due,
            req.body.finished
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: task || null
        });
    } catch (err) {
        logger.error('An error occurred while updating task:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await tasksDAO.deleteUserTask(
            req.session.user.app_user_id,
            req.params.listId,
            req.params.taskId
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: task || null
        });
    } catch (err) {
        logger.error('An error occurred while deleting task:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};
