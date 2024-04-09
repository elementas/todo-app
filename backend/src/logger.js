const winston = require('winston');

const { format } = winston;
const config = require('../config');

const logger = winston.createLogger({
    level: config.logger.level,
    transports: [
        new winston.transports.Console({
            format: format.combine(format.timestamp(), format.prettyPrint())
        })
    ]
});

// eslint-disable-next-line no-console
logger.on('error', (err) => console.error('Logger error:', err));

module.exports = logger;
