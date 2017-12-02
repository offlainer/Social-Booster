const db = require('../database/db');
const passport = require('../config/passport');
const User = require('../models/user');
const log = require('../config/eye')('controller[user]');

const unit = {
    login: (req, res) => {
        log.info('Try to login a user');

        passport.authenticate('local',
            function (err, user, info) {
                try {
                    if (info) log.info(info);
                    if (user) {
                        req.logIn(user, function () {
                            log.done(`User with email ${user.email} was login!`);
                            res.redirect('/');
                        });
                    } else {
                        throw new Error(`User with email ${req.body.username} is not exists`);
                    }
                } catch(e) {
                    log.err('Unable to login user', e.message);
                    res.redirect('/auth#login');
                }
            }
        )(req, res);
    },
    signup: (req, res) => {
        log.info('Try to signup a user');

        db.addUser(req.body)
            .then((data) => {
                log.info('Try to login a new user');
                try {
                    let user = new User(data);

                    req.logIn(user, function () {
                        log.done(`User with email ${user.email} was registred!`);
                        res.redirect('/');
                    });
                } catch(err) {
                    log.err('Unable to login a new user', err.message);
                    process.exit(1);
                }
            }).catch((err) => {
                log.err('Unable to save a new user', err.message);
                process.exit(1);
        });
    }
};

module.exports = unit;

