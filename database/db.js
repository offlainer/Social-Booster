const config = require('../config/config')();
const pgp = require("pg-promise")(/*options*/);
const errors = pgp.errors.queryResultErrorCode;
const db = pgp(`postgres://${config.db.user}:${config.db.password}@` +
            `${config.db.host}:${config.db.port}/${config.db.name}`);

/*
================================================================
 Database the class
================================================================
 Present of a instruments for a work with the database side
================================================================
*/

const database = {
    /*
    ================================================================
     Users table
    ================================================================
    */
    users : {
        /* record new user in database */
        add : (user) => {
            return db.one(__prepareQuery('INSERT INTO users (&fields) VALUES (&values) RETURNING *',
                user));
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
    /*
    ================================================================
    Accounts Table
    ================================================================
    */
    accounts : {
        add : (account) => {
            return db.one(__prepareQuery('INSERT INTO accounts(&fields)' +
                ' VALUES (&values) RETURNING *', account));
        },
        get : (cond) => {
            return db.query(__prepareSelect('SELECT * FROM accounts', cond))
                .then((res) => {
                   return res;
                }).catch((err) => {
                    if (err.code === errors.noData) {
                        return null;
                    } else {
                        return err;
                    }
                });
        }
    }

};

/* Format a data as string before perform a query */
/*
================================================================
 Format a content as string before perform a query
================================================================
 >>> string [query] : query to the database >>>
 >>> object [content] : input content >>>
================================================================
 <<< string <<<
================================================================
*/
const __prepareQuery = (query, data) => {
    let fields = '', values  = '';

    for (let field in data) {
        fields += `${field},`;
    }

    for (let value of Object.values(data)) {
        values += `'${value}',`;
    }

    query = query.replace(new RegExp(`(\\(&fields\\))\\s([\\w]+)\\s(\\(&values\\))`, 'i'),
        `(${fields.slice(0, -1)}) $2 (${values.slice(0, -1)})`
    );

    return query;
};
/*
================================================================
 Prepare a select query
================================================================
 >>> string [query] : query to the database >>>
 >>> string [cond] : select query`s a conditions >>>
================================================================
 <<< string <<<
================================================================
*/
function __prepareSelect(query, cond) {
    if (cond) {
        let i = 0;

        query += ' WHERE ';

        for (let field in cond) {
            i++;
            query += `${field} = '${cond[field]}'`;

            if (i < Object.keys(cond).length) query += ' AND ';
        }
    }

    return query;
}

module.exports = database;
