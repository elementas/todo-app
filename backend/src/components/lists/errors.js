const { getErrorObject } = require('../../utils');

module.exports = {
    LIST_EXISTS: getErrorObject(
        400,
        'list_exists',
        'List label is already in use. Please use a different label'
    )
};
