const { checkBoolean } = require('./utils');

const { APP_LOG_LEVEL, APP_LOG_HTTP_REQUESTS, APP_LOG_HTTP_LOG_LEVEL } =
    process.env;

const LOG_LEVELS = [
    'error',
    'warn',
    'info',
    'http',
    'verbose',
    'debug',
    'silly'
];

function checkLogLevel(value = '', defaultValue = 'info') {
    const lValue = value.toLowerCase();
    if (LOG_LEVELS.includes(lValue)) {
        return lValue;
    }
    return defaultValue;
}

module.exports = {
    level: checkLogLevel(APP_LOG_LEVEL),
    logHTTPRequests: checkBoolean(APP_LOG_HTTP_REQUESTS, true),
    httpLogLevel: checkLogLevel(APP_LOG_HTTP_LOG_LEVEL)
};
