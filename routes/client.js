const express = require('express');
const router = express.Router();
const config = require('../config/config')();
const log = require('../config/eye')('router[client]');

router.get('/', (req, res) => {
    const method = req.query.method;
    const params = req.query.params.split(',');
    let answer = '';

    try {
        if (method) {
            if (method === 'config') {
                answer = getConfigValue(params);
            } else {
                throw new Error(`Undefined method '${method}'`);
            }
        } else {
            throw new Error('Method is not specified');
        }

        res.send(answer);
    } catch (e) {
        log.err(`Cant't load data from server : ${e.message}`);
        res.sendStatus(500);
    }
});

function getConfigValue(params) {
    if (params) {
        /* TODO
        *  The parse of every config properties looks ridiculous
        *  Need to change that
        * */
        if (config.hasOwnProperty(params[0])) {
            let p1 = config[params[0]][params[1]];
            if (p1) {
                let p2 = config[params[0]][params[1]][params[2]];

                if (p2) {
                    return p2
                } else {
                    return p1;
                }
            } else {
                return config[params[0]];
            }
        }
    }

    return config;
}

module.exports = router;

