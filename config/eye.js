const debug = require('debug')('Eye');
const chalk = require('chalk');

/*
================================================================
Logger is the tool that output a
message with some type(stderr, stdout) into debug console
================================================================
>>> string [msg] : input message >>>
>>> string [rsn] : error a occurrence reason >>>
================================================================
*/
const eye = (unitName) => {
    return {
        name : unitName,
        /* Logging an object */
        log : function (msg) {
            debug.log = console.log.bind(console);
            debug(`${this.name} =>`);
            debug(msg);
        },
        /* Logging a info message */
        info : function (msg) {
            debug.log = console.info.bind(console);
            debug(`${chalk.whiteBright(this.name)} => ${chalk.blue(msg)}`);
        },
        /* Logging a error message */
        err : function (msg, rsn = '') {
            debug.log = console.error.bind(console);
            debug(`${chalk.whiteBright(this.name)} => ${chalk.red(`${msg}; ${rsn ? chalk.whiteBright('Reason : ') + rsn : ''}`)}`);
        },
        /* Logging a success message */
        done : function (msg) {
            debug.log = console.info.bind(console);
            debug(`${chalk.whiteBright(this.name)} => ${chalk.green(msg)}`);
        }
    }
};

module.exports = eye;


