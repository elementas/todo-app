const expressSession = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');
const config = require('../../config');
const logger = require('../logger');

const client = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    username: config.redis.username,
    password: config.redis.password,
    db: config.redis.db,
    retryStrategy() {
        return 5000;
    }
});

client.on('error', (err) => {
    logger.error('Redis error:', err);
});

const store = new RedisStore({
    client
});

module.exports = expressSession({
    cookie: {
        httpOnly: true,
        maxAge: config.app.cookieMaxAge,
        sameSite: true
    },
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: config.app.sessionSecret,
    store
});
