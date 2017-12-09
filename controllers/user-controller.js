const db = require('../database/db');
const passport = require('../config/passport');
const User = require('../models/user');
const Account = require('../models/account');
const log = require('../config/eye')('controller[user]');
const dbLog = require('../config/eye')('database');

/*
================================================================
 Unit controller the class
================================================================
 Present of a instruments for work with a user models
================================================================
*/

const unit = {
    /*
    ================================================================
     Login a user
    ================================================================
    */
    login : (req, res) => {
        log.info('Try to login a user');

        passport.authenticate('local',
            function (err, data, info) {
                try {
                    if (err) throw new Error(err.message);
                    if (info) dbLog.info(info);
                    if (data) {
                        let user = new User(data).client();

                        log.info('Try to get a user social accounts');

                        db.accounts.get({ user_id : data.id})
                            .then((accounts) => {
                                if (!accounts) {
                                    log.info('No one social account was bound by a user');
                                } else {
                                    for (let account of accounts) {
                                        account = new Account(account).client();

                                        if (account.provider === Account.providers().vk) {
                                            user.accounts.vk = account;
                                        } else if (account.provider === Account.providers().fb) {
                                            user.accounts.fb = account;
                                        } else if (account.provider === Account.providers().tw) {
                                            user.accounts.tw = account;
                                        }

                                        dbLog.info(`${account.provider} account of user ${user.email} is exists`);
                                    }
                                }

                                req.logIn(user, function () {
                                    log.done(`User with email ${user.email} was login!`);

                                    res.redirect('/');
                                });
                            }).catch((err) => {
                                throw new Error(err.message);
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
    /*
    ================================================================
     Sign up and login a new user
    ================================================================
    */
    signup : (req, res) => {
        log.info('Try to signup a user');

        let user = new User(req.body);

        db.users.add(user.db())
            .then((data) => {
                log.info('Try to login a new user');

                try {
                    if (data) {
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
    },

    /*
    ================================================================
     Get a user account
    ================================================================
     >>> string [ provider ] : social provider  >>>
    ================================================================
     <<< XHR <<<
    ================================================================
    */
    account : (req, res, provider = null) => {
        log.info('Try to get a user account');

        let condition = {'user_id' : req.user.id};

        if (provider) {
            condition.provider = provider;
        }

        db.accounts.get(condition).then((data) => {
            if (data) {
                log.done(`Accounts list of the user ${req.user.id} was loaded!`);

                res.status(200).send(data);
            } else {
                throw new Error(`Can't load an account of the user ${req.user.email}`);
            }
        }).catch((err) => {
            log.err(err.message);

            res.status(500).send(err.message);
        });
    }
};

module.exports = unit;

