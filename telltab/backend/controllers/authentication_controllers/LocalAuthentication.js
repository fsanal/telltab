var User = require('../../models/User');
var passport = require('passport');
const LocalStrategy = require('passport-local');

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
            return done('That email is already taken.', null);
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

login = (req, res) => {

}

function isLoggedIn(req, res) {

    if (req.isAuthenticated())
        return res.json({ authenticated: true });

    res.redirect('/');
}

module.exports = {  };