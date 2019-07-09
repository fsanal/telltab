const express = require('express');
const router = express.Router();

const local_authentication_controller = require('../controllers/authentication_controllers/LocalAuthentication');
router.post('/authenticate/login', local_authentication_controller.login);
router.post('/authenticate/signup', local_authentication_controller.signup);

module.exports = router;