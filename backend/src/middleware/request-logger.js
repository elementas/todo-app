const config = require('../../config');
const logger = require('../logger');

function setRequestLogger(req, res, next) {
    const logWhenDone = () => {
        if (res.locals.finished) {
            return;
        }

        res.locals.finished = true;

        const statusCode = res.headersSent && res.statusCode;
        const runtime = new Date().getTime() - res.locals.timestamp;
        const timestamp = new Date(res.locals.timestamp).toISOString();
        const referer = req.get('referer') || req.get('referrer') || '';
        const userAgent = req.get('user-agent');
        const user = req?.session?.email || '';
        const bytesWritten =
            req.socket.bytesWritten - res.locals.socketBytesWrittenStart;

        logger.log(
            config.logger.httpLogLevel,
            `${res.locals.id} - ${res.locals.ip} - ${user} - [${timestamp}] "${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${statusCode} ${bytesWritten} "${referer}" "${userAgent}" ${runtime}ms`
        );
    };

    res.once('error', logWhenDone);
    res.once('finish', logWhenDone);

    next();
}

module.exports = setRequestLogger;
