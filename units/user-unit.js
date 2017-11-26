const db = require('../database/db');
const passport = require('../config/passport');
const User = require('../models/user');

const unit = {
    login: (req, res) => {
        console.log('App => Unit[User] : Try to login a user');

        passport.authenticate('local',
            function (err, user, info) {
                try {
                    if (info) console.log(info);
                    if (user) {
                        req.logIn(user, function () {
                            console.log(`App => Error : User with email ${user.email} was login!`);
                            res.redirect('/');
                        });
                    } else {
                        console.log(`App => Error : Unable to login user;\n` +
                            `Reason: User with email ${req.body.username} is not exists`);
                        res.redirect('/auth#login');
                    }
                } catch(err) {
                    console.log(`App => Error : Unable to login user;\nReason : ${err.message};`);
                    process.exit(1);
                }
            }
        )(req, res);
    },
    signup: (req, res) => {
        console.log('App => Unit[User] : Try to signup a user');

        db.addUser(req.body)
            .then((data) => {
                console.log('App => Unit[User] : Try to login a new user');
                try {
                    let user = new User(data);

                    if (user) {
                        req.logIn(user, function () {
                            console.log(`App => Unit[User] : User with email ${user.email} was registred!`);
                            res.redirect('/');
                        });
                    }
                } catch(err) {
                    console.log(`Error : Unable to login a new user;\nReason: ${err.message};`);
                    process.exit(1);
                }
            }).catch((err) => {
               console.log(`Error : Unable to save a new user;\nReason : ${err.message};`);
               process.exit(1);
        });
    }
};

module.exports = unit;

