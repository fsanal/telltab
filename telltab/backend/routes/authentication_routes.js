const express = require('express');
const router = express.Router();
const passport = require('passport');

const local_authentication_controller = require('../controllers/authentication_controllers/LocalAuthentication');
router.post('/authenticate/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, user: user });
    })(req, res, next);
});
router.post('/authenticate/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, user: user });
    })(req, res, next);
});

module.exports = router;