const Model = require('./base/model');
const helper = require('../helpers/helper');

/*
================================================================
 User a social account class
================================================================
 Present of a user a social account
================================================================
*/

class Account extends Model {
    constructor (account) {
        super();
        // # Account ID
        this.id = this.id ? this.id : null;
        // # Profile id
        this.profile_id = account.id;
        // # Domain name
        this.domain = account.domain;
        // # User first name
        this.first_name = account.first_name;
        // # User last name
        this.last_name = account.last_name;
        // # Profile reference
        this.url = account.url ? account.url : account.href;
        // # User id
        this.user_id = account.user_id ? account.user_id : null;
        // # Provider name
        this.provider = account.provider ? helper.ucFirst(account.provider) : '';

        this.ignored.clientFields = ['id', 'user_id'];
        this.ignored.dbFields = ['id'];
    }

    /* Get a social providers list
    *  return : Object
    * */
    static providers () {
        return {
            vk : 'Vkontakte',
            fb : 'Facebook',
            tw : 'Twitter'
        }
    };
}

module.exports = Account;