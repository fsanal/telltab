var mongoose = require('mongoose')
var User = require('../../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

login = (req, res) => {

}

signup = (req, res) => {
    // passport.authenticate('local-signup', {
    //     successRedirect : '/profile',
    //     failureRedirect : '/signup'
    // });
}

function isLoggedIn(req, res) {

    if (req.isAuthenticated())
        return res.json({ authenticated: true });

    res.redirect('/');
}

passport.serializeUser(function(user) {
    return res.json(user._id);
});

passport.deserializeUser(function(id) {
    User.findById(id, function(err, user) {
        return res.json(user);
    });
});

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, 'That email is already taken.');
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

    });

}));

module.exports = { login, signup };