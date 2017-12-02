const nconf = require('nconf');
const log = require('../config/eye')('core[config]');
/* Задаем конфиг для приложения */
const loadAppConfig = (path = '') => {
    new Promise(() => {
        nconf.file({file : __dirname + '/config-local.json'});

        if (!nconf.get('appRoot')) {
            if (!path) path = process.execPath;
            nconf.set('appRoot' , path);
            nconf.save();
        }
        nconf.required(['appName', 'appRoot']);
    }).catch((err) => {
        log.err('Cant load the config', err.message);
        process.exit(1);
    });

    return nconf.get();
}

module.exports = loadAppConfig;