const { checkPort, checkInt } = require('./utils');

const {
    APP_REDIS_HOST,
    APP_REDIS_PORT,
    APP_REDIS_USERNAME,
    APP_REDIS_PASSWORD,
    APP_REDIS_DB
} = process.env;

function checkRedisDB(value = '', defaultValue = 0) {
    const intValue = checkInt(value, defaultValue);

    return intValue >= 0 && intValue <= 15 ? intValue : defaultValue;
}

module.exports = {
    host: APP_REDIS_HOST || '127.0.0.1',
    port: checkPort(APP_REDIS_PORT, 6379),
    username: APP_REDIS_USERNAME || '',
    password: APP_REDIS_PASSWORD || '',
    db: checkRedisDB(APP_REDIS_DB)
};
