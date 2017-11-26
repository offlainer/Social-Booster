/* Database service */
const config = require('../config/config')();
const pgp = require("pg-promise")(/*options*/);
const db = pgp(`postgres://${config.db.user}:${config.db.password}@` +
    `${config.db.host}:${config.db.port}/${config.db.name}`);

const Database = {
    /* USERS TYPE REQUESTS */

    /* record new user in database */
    addUser : function (user) {
        return db.one('INSERT INTO users (type, name, email, password) VALUES (0, $1, $2, $3) RETURNING *',
            [user.username, user.email, user.password]);
    },
    /* get specified user from database */
    getUser : function (username, password) {
        return db.one('SELECT * FROM users WHERE email = $1 AND password = $2', [username, password]);
    },
    /* get specified user from database by passed id*/
    getUserById : function (id) {
        return db.one('SELECT * FROM users WHERE id = $1', id);
    }
};

module.exports = Database;
