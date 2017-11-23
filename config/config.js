const nconf = require('nconf');

/* Задаем конфиг для приложения */
const loadAppConfig = () => {
    let loader = new Promise((resolve) => {
        nconf.file({file : __dirname + '/config-local.json'});

        if (!nconf.get('appRoot')) {
            if (!path) path = process.execPath;
            nconf.set('appRoot' , path);
            nconf.save();
        }
        nconf.required(['appName', 'appRoot']);
    });
    loader.catch((err) => {
        console.log('Cant load the config');
        console.log(err);
        process.exit(1);
    });

    return nconf.get();
}

module.exports = loadAppConfig;