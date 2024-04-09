const { checkPort } = require('./utils');

const {
    APP_POSTGRES_HOST,
    APP_POSTGRES_PORT,
    APP_POSTGRES_USERNAME,
    APP_POSTGRES_PASSWORD,
    APP_POSTGRES_DATABASE
} = process.env;

module.exports = {
    host: APP_POSTGRES_HOST || '127.0.0.1',
    port: checkPort(APP_POSTGRES_PORT, 5432),
    username: APP_POSTGRES_USERNAME || 'backend',
    password: APP_POSTGRES_PASSWORD,
    name: APP_POSTGRES_DATABASE || 'todo'
};
