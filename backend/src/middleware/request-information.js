const uuidv4 = require('uuid').v4;

function setRequestInformation(req, res, next) {
    const requestIdHeader = req.get('x-request-id');
    const requestId = requestIdHeader || uuidv4();

    if (!requestIdHeader) {
        res.set('x-request-id', requestId);
    }

    res.locals.id = requestId;
    res.locals.timestamp = new Date().getTime();
    res.locals.ip = req.socket.remoteAddress;
    res.locals.socketBytesWrittenStart = req.socket.bytesWritten;

    next();
}

module.exports = setRequestInformation;
