const pg = require('pg');
const config = require('../config');
const logger = require('./logger');

const pool = new pg.Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    user: config.postgres.username,
    password: config.postgres.password,
    database: config.postgres.name
});

pool.on('error', (err) => logger.error('Database error:', err));

module.exports = pool;
