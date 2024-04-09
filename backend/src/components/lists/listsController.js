const logger = require('../../logger');
const RequestError = require('../../RequestError');
const { STATUS } = require('../../constants');
const defaultErrors = require('../../errors');
const errors = require('./errors');
const listsDAO = require('./listsDAO');

exports.getList = async (req, res, next) => {
    try {
        const list = await listsDAO.getUserList(
            req.session.user.app_user_id,
            req.params.listId
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: list || null
        });
    } catch (err) {
        logger.error('An error occurred while retrieving list:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.getLists = async (req, res, next) => {
    try {
        const lists = await listsDAO.getUserLists(req.session.user.app_user_id);

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: lists || []
        });
    } catch (err) {
        logger.error('An error occurred while retrieving lists:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.createList = async (req, res, next) => {
    try {
        const list = await listsDAO.createUserList(
            req.session.user.app_user_id,
            req.body.label
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: list || null
        });
    } catch (err) {
        if (err.constraint === 'app_list_label_app_user_id') {
            logger.error(`List '${req.body.label}' already exists`);
            next(new RequestError({ ...errors.LIST_EXISTS, cause: err }));
        } else {
            logger.error('An error occurred while creating list:', err);
            next(
                new RequestError({
                    ...defaultErrors.SERVER_ERROR,
                    cause: err
                })
            );
        }
    }
};

exports.updateList = async (req, res, next) => {
    try {
        const list = await listsDAO.updateUserList(
            req.session.user.app_user_id,
            req.params.listId,
            req.body.label
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: list || null
        });
    } catch (err) {
        if (err.constraint === 'app_list_label_app_user_id') {
            logger.error(`List '${req.body.label}' already exists`);
            next(new RequestError({ ...errors.LIST_EXISTS, cause: err }));
        } else {
            logger.error('An error occurred while updating list:', err);
            next(
                new RequestError({
                    ...defaultErrors.SERVER_ERROR,
                    cause: err
                })
            );
        }
    }
};

exports.deleteList = async (req, res, next) => {
    try {
        const list = await listsDAO.deleteUserList(
            req.session.user.app_user_id,
            req.params.listId
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: list || null
        });
    } catch (err) {
        logger.error('An error occurred while deleting list:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};
