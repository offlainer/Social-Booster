const config = require('../config/config')();
const pgp = require("pg-promise")(/*options*/);
const db = pgp(`postgres://${config.db.user}:${config.db.password}@` +
    `${config.db.host}:${config.db.port}/${config.db.name}`);

/* Database service */

const database = {
    /* USERS TYPE REQUESTS */
    users : {
        /* record new user in database */
        add : (user) => {
            return db.one('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [user.username, user.email, user.password]);
        },
        /* get specified user from database */
        get : (username, password) => {
            return db.one('SELECT * FROM users WHERE email = $1 AND password = $2', [username, password]);
        },
        /* get specified user from database by passed id */
        getById : (id) => {
            return db.one('SELECT * FROM users WHERE id = $1', id);
        }
    },
    accounts : {
        add : (account) => {
           
        }
    }

};

module.exports = database;
