const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const logger = require('./logger');
const RequestError = require('./RequestError');
const errors = require('./errors');

const validator = new Ajv();

addFormats(validator);

exports.addSchema = (schemaObject, schemaName) => {
    validator.addSchema(schemaObject, schemaName);
};

exports.getRequestValidator = (schemaName, property = 'body') => {
    const validate = validator.getSchema(schemaName);

    if (!validate) {
        throw new Error(`Schema '${schemaName}' is not defined.`);
    }

    return (req, res, next) => {
        if (validate(req[property])) {
            return next();
        }

        logger.debug(validate.errors);

        next(new RequestError({ ...errors.BAD_REQUEST }));
    };
};
