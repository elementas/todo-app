const app = require('./app');
const logger = require('./logger');
const postgres = require('./postgres');
const redis = require('./redis');

module.exports = {
    app,
    logger,
    postgres,
    redis
};
