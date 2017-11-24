/* Database service */
const config = require('../config/config')();
const pgp = require("pg-promise")(/*options*/);
const db = pgp(`postgres://${config.db.user}:${config.db.password}@` +
    `${config.db.host}:${config.db.port}/${config.db.name}`);

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
