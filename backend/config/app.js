const { checkInt, checkPort } = require('./utils');

const { APP_PORT, APP_SESSION_SECRET, APP_COOKIE_MAX_AGE } = process.env;

module.exports = {
    port: checkPort(APP_PORT, 3000),
    sessionSecret: APP_SESSION_SECRET || 'some random session secret',
    cookieMaxAge: checkInt(APP_COOKIE_MAX_AGE, 24 * 60 * 60 * 1000)
};
