var User = require('../../models/User');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: '899394549203-l8n4h7i4e0b9fid5va4mueqsips450mg.apps.googleusercontent.com',
    clientSecret: '2WcpkpIJnkkE7tWWCQ4Wssz3',
    callbackURL: 'http://localhost:3001/api/authenticate/google/callback'
},
function(token, refreshToken, profile, done) {
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
            return done(null, user);
        } 
        else {
            var newUser = new User();

            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;

            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }
    });
}));

function isLoggedIn(req, res) {
    if (req.isAuthenticated())
        return ({ authenticated: true });

    return ({ authenticated: false });
}

logout = (req, res) => {
    req.logout();
    return res.json({ success: true });
}

module.exports = { logout };

