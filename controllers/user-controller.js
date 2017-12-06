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
                        throw new Error(`User with email ${req.body.username} 
                            is not exists or password is wrong`);
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

        let user = new User(req.body);

        db.users.add(user.db())
            .then((data) => {
                log.info('Try to login a new user');

                try {
                    if (data) {
                        user.id = data.id;

                        req.logIn(user, function () {
                            log.done(`User with email ${user.email} was registred!`);

                            res.redirect('/');
                        });
                    } else {
                        throw new Error('Empty data returns');
                    }
                } catch(err) {
                    log.err('Unable to login a new user', err.message);
                    process.exit(1);
                }
            }).catch((err) => {
                log.err('Unable to save a new user in the database', err.message);
                process.exit(1);
        });
    }
};

module.exports = unit;

