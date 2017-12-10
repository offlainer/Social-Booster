const db = require('../database/db');
const Account = require('../models/account');
const log = require('../config/eye')('controller[account]');
const dbLog = require('../config/eye')('database');

/*
================================================================
 Account controller the class
================================================================
 Present of a instruments for work with a user social accounts
================================================================
*/

const unit = {
    save : (req, res) => {
        log.info('Try to save a user social account');

        let account = new Account(req.body.session.user);
        account.user_id = req.user.id;

        if (req.query.provider) {
            account.provider = req.query.provider;
        }

        db.accounts.add(account.db()).then((data) => {
            log.done(`Account ${account.domain} of user ${req.user.email} was bound!`);

            account.id = data.id;

            if (account.provider === Account.providers().vk) {
                req.user.accounts.vk = account;
            } else if (account.provider === Account.providers().fb) {
                req.user.accounts.fb = account;
            } else if (account.provider === Account.providers().tw) {
                req.user.accounts.tw = account;
            }

            res.status(200).send(account.client());
        }).catch((err) => {
            dbLog.err(err.message);

            res.status(500).send('Sorry, but something go wrong');
        });
    },
    get : (req, res) => {
        log.info('Try to get a user social account');

        let user = {
            profile : req.user
        },
        condition = {'user_id' : req.user.id};

        db.accounts.get(condition).then((account) => {
            log.done(`Account ${account.domain} of user ${req.user.email} was bound!`);

            user.account = account;

            res.render('profile', { user : user });
        }).catch((err) => {
            dbLog.err(err.message);

            res.status(500).send('Sorry, but something go wrong');
        });
    }
};

module.exports = unit;
