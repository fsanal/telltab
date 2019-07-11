var User = require('../../models/User');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, email, password, done) {
    User.findOne({ 'email' :  email }, function(err, user) {
        if (err) {
            return done(err, null);
        }
        if (user) {
            return done('That email is already taken', null);
        } 
        else {
            var newUser = new User();

            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }
    });    
}));

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, email, password, done) {
    User.findOne({ 'email' :  email }, function(err, user) {
        if (err) {
            return done(err, null);
        }
        if (!user) {
            return done('User does not exist', null);
        }
        if (!user.validPassword(password)) {
            return done('Incorrect password', null);
        }
        
        return done(null, user);
    });

}));

function isLoggedIn(req, res) {

    if (req.isAuthenticated())
        return res.json({ authenticated: true });

    res.redirect('/');
}

module.exports = {  };