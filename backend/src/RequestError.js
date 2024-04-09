class RequestError extends Error {
    constructor({ message, statusCode = 500, code = null, cause = null } = {}) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.cause = cause;
    }
}

module.exports = RequestError;
