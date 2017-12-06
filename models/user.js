const Model = require('./base/model');

class User extends Model {
    constructor (user) {
        super();

        this.id = user.id ?  user.id : null;
        this.role = user.role ?  user.role : 0;
        this.name = user.username;
        this.email = user.email;
        this.password = user.password;

        this.ignored.dbFields = ['id'];
    }
}

module.exports = User;