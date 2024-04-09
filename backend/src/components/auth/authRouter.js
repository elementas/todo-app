const { Router } = require('express');
const authController = require('./authController');
const validator = require('../../validator');
const credentialsSchema = require('./schemas/credentials.json');
const registrationSchema = require('./schemas/registration.json');

const router = new Router();

validator.addSchema(credentialsSchema, 'auth/credentials');
validator.addSchema(registrationSchema, 'auth/registration');

router.post(
    '/register',
    validator.getRequestValidator('auth/registration'),
    authController.register
);
router.post(
    '/login',
    validator.getRequestValidator('auth/credentials'),
    authController.login
);
router.post('/logout', authController.logout);
router.get('/check', authController.check);

module.exports = router;
