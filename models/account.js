const Model = require('./base/model');

class Account extends Model {
    constructor (account) {
        super();

        this.id = null;
        this.profile_id = account.id;
        this.domain = account.domain;
        this.first_name = account.first_name;
        this.last_name = account.last_name;
        this.url = account.href;
        this.user_id = null;
        this.provider = null;

        this.ignored.dbFields = ['id'];
    }
}

module.exports = Account;