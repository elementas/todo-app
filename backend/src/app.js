const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const router = require('./router');
const config = require('../config');

const app = express();

app.use(middleware.requestInformation);
if (config.logger.logHTTPRequests) {
    app.use(middleware.requestLogger);
}
app.use(middleware.expressSession);
app.use(helmet());
app.use(bodyParser.json());
app.use('/app', router);
app.use(middleware.errorHandlers.onNotFound);
app.use(middleware.errorHandlers.onRequestError);

module.exports = app;
