function setReturnMethod(req, res, next) {
    res.locals.return = () => {};

    next();
}

module.exports = setReturnMethod;
