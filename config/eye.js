const debug = require('debug')('Eye');
const chalk = require('chalk');

/* Logger is the tool that output a message with some type(stderr, stdout) into debug console
*
* string msg : input message
* string rsn (only for stderr, optional) : an error occurrence reason
*
* */
const eye = (unitName) => {
    return {
        name : unitName,
        /* logging info message */
        info : function (msg) {
            debug.log = console.info.bind(console);
            debug(`${this.name} => ${chalk.blue(msg)}`);
        },
        /* logging error message */
        err : function (msg, rsn = '') {
            debug.log = console.error.bind(console);
            debug(`${chalk.white(this.name)} => ${chalk.red(`${msg}; ${rsn ? chalk.white('Reason : ') + rsn : ''}`)}`);
        },
        /* logging success message */
        done : function (msg) {
            debug.log = console.info.bind(console);
            debug(`${this.name} => ${chalk.green(msg)}`);
        }
    }
};

module.exports = eye;


