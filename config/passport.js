const passport = require('passport');
const strategy = require('passport-local');
const db = require('../database/db');

passport.use(new strategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    db.getUser(username, password).then((user) => {
        return done(null, user, 'App => Passport : Well, user is exists in database');
    }).catch((err) => {
        done(err);
    })
}));

passport.serializeUser(function (user, done) {
    console.log(`App => Passport : New session for user ${user.email} was created`);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.getUserById(id).then((user) => {
        done(null, user, 'App => Passport : Well, user is exists in the current session');
    }).catch((err) => {
        done(err);
    })
});

module.exports = passport;



