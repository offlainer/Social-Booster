const Model = require('./base/model');

class User extends Model {
    constructor (id, type = 0, name, password) {
        super();

        this.id = id;
        this.type = type;
        this.name = name;
        this.password = password;
    }
}

module.exports = User;