const { getErrorObject } = require('./utils');

module.exports = {
    BAD_REQUEST: getErrorObject(400, 'bad_request', 'Bad request'),
    UNAUTHORIZED: getErrorObject(401, 'unauthorized', 'Unauthorized access'),
    NOT_FOUND: getErrorObject(404, 'not_found', 'Not found'),
    SERVER_ERROR: getErrorObject(500, 'server_error', 'Internal server error')
};
