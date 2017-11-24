/* Database service */

const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://postgres:lightkeeper@localhost:5432/social_booster");

const Db = {
    /* USERS TYPE REQUESTS */

    /* record new user in database */
    addUser : function (user) {
        return db.one('INSERT INTO users(name, password) VALUES($1, $2) RETURNING name, id',
            [user.username, user.password]);
    },
    /* get specified user from database */
    getUser : function (username) {
        return db.one('SELECT * FROM users WHERE name = $1', username);
    }
};

module.exports = Db;
