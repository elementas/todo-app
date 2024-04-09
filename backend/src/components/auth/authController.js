const { setTimeout } = require('timers/promises');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const logger = require('../../logger');
const RequestError = require('../../RequestError');
const { STATUS } = require('../../constants');
const defaultErrors = require('../../errors');
const errors = require('./errors');
const authDAO = require('./authDAO');

const DELAY_MS = 3000;

exports.register = async (req, res, next) => {
    try {
        const user = await authDAO.registerUser(
            req.body.name,
            req.body.email,
            await bcrypt.hash(req.body.password, 11)
        );

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: { ...user }
        });
    } catch (err) {
        if (err.constraint === 'app_user_email_idx') {
            logger.error(`User '${req.body.email}' already exists`);
            next(new RequestError({ ...errors.EMAIL_EXISTS, cause: err }));
        } else {
            logger.error('An error occurred while registrating user:', err);
            next(
                new RequestError({ ...defaultErrors.SERVER_ERROR, cause: err })
            );
        }
    }
};

exports.login = async (req, res, next) => {
    try {
        if (req.session.user) {
            res.status(200).json({
                status: STATUS.SUCCESS,
                data: { ...req.session.user }
            });
            return;
        }

        const user = await authDAO.getUserInformation(req.body.email);

        if (!user) {
            await setTimeout(DELAY_MS);
            return next(new RequestError({ ...errors.INVALID_CREDENTIALS }));
        }

        if (!(await bcrypt.compare(req.body.password, user.password))) {
            await setTimeout(DELAY_MS);
            return next(new RequestError({ ...errors.INVALID_CREDENTIALS }));
        }

        delete user.password;

        await promisify(req.session.regenerate).call(req.session);

        req.session.user = { ...user };

        await promisify(req.session.save).call(req.session);

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: { ...user }
        });
    } catch (err) {
        logger.error('An error occurred while logging the user in:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.logout = async (req, res, next) => {
    try {
        if (req.session.user) {
            await promisify(req.session.destroy).call(req.session);
        }

        res.status(200).json({
            status: STATUS.SUCCESS,
            data: null
        });
    } catch (err) {
        logger.error('An error occurred while logging the user out:', err);
        next(
            new RequestError({
                ...defaultErrors.SERVER_ERROR,
                cause: err
            })
        );
    }
};

exports.check = async (req, res, next) => {
    res.status(200).json({
        status: STATUS.SUCCESS,
        data: req.session.user ? { ...req.session.user } : null
    });
};

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    next(new RequestError({ ...defaultErrors.UNAUTHORIZED }));
};

exports.isAdmin = (req, res, next) => {
    if (req.session.user?.admin) {
        return next();
    }

    next(new RequestError({ ...defaultErrors.UNAUTHORIZED }));
};
