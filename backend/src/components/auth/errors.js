const { getErrorObject } = require('../../utils');

module.exports = {
    INVALID_CREDENTIALS: getErrorObject(
        400,
        'invalid_credentials',
        'Invalid credentials provided'
    ),
    EMAIL_EXISTS: getErrorObject(
        400,
        'email_exists',
        'This email address is already in use. Please use a different email'
    )
};
