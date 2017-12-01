const Model = require('./base/model');

class User extends Model {
    constructor (user) {
        super();

        this.id = user.id;
        this.role = user.role;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }
}

module.exports = User;