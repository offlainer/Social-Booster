const log = require('../../config/eye')('class[Message]');

/*
================================================================
 Message the class
================================================================
 Some message with title and text
================================================================
*/

class Message {

    constructor (message = {}) {

        /*
        ================================================================
         FIELDS
        ================================================================
        */
        this.head = message.head ? message.head : '';
        this.body = message.body ? message.body : '';
    }
}

module.exports = Message;