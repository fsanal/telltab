var User = require('../../models/User');
var passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: '690785751367321',
    clientSecret: 'f83de4347a52eb6216a85d22e1168b88',
    callbackURL: 'http://localhost:3001/api/authenticate/facebook/callback'
},
function(token, refreshToken, profile, done) {
    User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        }
        else {
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;                 
            newUser.facebook.name  = profile.displayName;
            newUser.facebook.email = profile.emails;

            newUser.save(function(err) {
                if(err) {
                    throw err;
                }
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