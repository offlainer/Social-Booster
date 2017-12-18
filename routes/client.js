const express = require('express');
const router = express.Router();
const config = require('../config/config')();
const log = require('../config/eye')('router[client]');

/*
================================================================
 Client side middleware the class
================================================================
 Present of the processing of a requests to the server
 from the client side
================================================================
*/

router.get('/', (req, res) => {
    const method = req.query.method;
    const params = req.query.params.split(',');

    log.info('Get a request from the client side');

    try {
        if (method) {
            if (method === 'config') {
                getConfigValue(params, res);
            } else if (method === 'account') {
                getUserAccount(req, res, params[0]);
            } else {
                throw new Error(`Undefined method '${method}'`);
            }
        } else {
            throw new Error('Method is not specified');
        }
    } catch (e) {
        log.err(`Cant't load data from server : ${e.message}`);
        res.status(500).send(e.message);
    }
});

function getUserAccount(req, res, provider) {
    const userUnit = require('../controllers/user-controller');

    userUnit.account(req, res, provider);
}

function getConfigValue(params, res) {
    let answer = {};

    log.info('Try to get a config value');

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
                    answer = p2;
                } else {
                    answer = p1;
                }
            } else {
                answer = config[params[0]];
            }
        } else {
            throw new Error(`Config value ${params[0]} is not exists`);
        }
    } else {
        throw new Error('Empty a request params');
    }

    if (answer) {
        log.done(`Config value got. Send the answer`);

        res.send(answer);
    } else {
        throw new Error(`Config value is empty`);
    }
}

module.exports = router;

