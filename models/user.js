const Model = require('./base/model');

/*
================================================================
 User the main class
================================================================
 Present of a member user ###
================================================================
*/

class User extends Model {
    constructor (user) {
        super();

        // # User ID
        this.id = user.id ?  user.id : null;
        // # Rights
        this.role = user.role ?  user.role : 0;
        // # Name
        this.name = user.name ? user.name : user.username;
        // # Email address
        this.email = user.email;
        // # Password
        this.password = user.password;
        // # Social accounts data
        this.accounts = {
            vk : null,
            fb : null,
            tw : null,
        };

        this.ignored.clientFields = ['role', 'password'];
        this.ignored.dbFields = ['id', 'accounts'];
    }
}

module.exports = User;