const RequestError = require('../RequestError');
const logger = require('../logger');
const { STATUS } = require('../constants');
const errors = require('../errors');

function onNotFound(req, res, next) {
    next(new RequestError({ ...errors.NOT_FOUND }));
}

function onRequestError(err, req, res, next) {
    let { statusCode, code, message } = err;

    if (!(err instanceof RequestError)) {
        logger.error('Unexpected error:', err);

        statusCode = errors.SERVER_ERROR.statusCode;
        code = errors.SERVER_ERROR.code;
        message = errors.SERVER_ERROR.message;
    }

    if (res.headersSent) {
        return next(err);
    }

    res.status(statusCode).json({
        status: STATUS.ERROR,
        message,
        data: { code }
    });
}

module.exports = { onRequestError, onNotFound };
