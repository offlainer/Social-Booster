const passport = require('passport');
const strategy = require('passport-local');
const db = require('../database/db');

/*
================================================================
    Authorize a user if it exists
    and return result for a login procedure
================================================================
 <<< Promise <<<
================================================================
*/
passport.use(new strategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    db.users.get(username, password).then((user) => {
        return done(null, user, `User is ${ user.email } exists in database`);
    }).catch((err) => {
        done(err);
    })
}));
/*
================================================================
 Write a user data in session storage
================================================================
 <<< Promise <<<
================================================================
*/
passport.serializeUser(function (user, done) {
    done(null, user);
});
/*
================================================================
 Get a user data if it exists in the database
 from a session storage ###
================================================================
 k<<< Promise <<<
================================================================
*/
passport.deserializeUser(function (user, done) {
    db.users.getById(user.id).then(() => {
        return done(null, user);
    }).catch((err) => {
        done(err);
    })
});

module.exports = passport;



