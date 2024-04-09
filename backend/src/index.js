const http = require('http');
const app = require('./app');
const config = require('../config');
const logger = require('./logger');

const CLOSE_TIMEOUT_MS = 10000;

let shuttingDown = false;
let exitCode = 0;
let server;

function shutdown(reason) {
    if (shuttingDown) {
        process.exit(exitCode);
    }

    shuttingDown = true;

    if (reason instanceof Error) {
        exitCode = 1;
        logger.error('Shutting down...');
        logger.error('Error:', reason);
    } else {
        logger.info('Shutting down...');
        logger.info(reason);
    }

    if (server) {
        server.close(() => process.exit(exitCode));
        setTimeout(() => process.exit(1), CLOSE_TIMEOUT_MS);
    } else {
        process.exit(exitCode);
    }
}

function start() {
    server = http.createServer(app);

    server.on('error', shutdown);

    server.listen(config.app.port, '0.0.0.0', () =>
        logger.info(`Listening on port ${config.app.port}`)
    );
}

process.once('uncaughtException', shutdown);
process.once('unhandledRejection', shutdown);
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);

start();
