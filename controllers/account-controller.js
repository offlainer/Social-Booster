const db = require('../database/db');
const Account = require('../models/account');
const log = require('../config/eye')('controller[account]');
const dbLog = require('../config/eye')('database');

const unit = {
    save : (req, res) => {
        log.info('Try to save a user social account');

        let account = new Account(req.body.session.user);
        account.provider = 'vkontakte';
        account.user_id = req.user.id;

        db.accounts.add(account.db()).then(() => {
            log.done(`Account of user ${req.user.email} was bound!`);

            res.status(200).send(account.client());
        }).catch((err) => {
            dbLog.err(err.message);

            res.status(500).send('Sorry, but something go wrong');
        });
    }
};

module.exports = unit;
