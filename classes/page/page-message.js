const Message = require('./message');
const log = require('../../config/eye')('class[PageMessage]');

/*
================================================================
 Message on a page the class
================================================================
 Represent a message on the page with one of few kinds :
 flash, info or error
 ---------------------------------------------------------------
 Flash : Simple nonsense message ;
 Info  : Message with an informative content ;
 Error : Message that inform when something go wrong ;
================================================================
*/

class PageMessage {

    constructor(message = {}) {

        /*
        ================================================================
         FIELDS
        ================================================================
        */
        // # Flash message content
        this.flash = message.flash ? new Message(message.flash) : {};
        // # Info message content
        this.info = message.info ? new Message(message.info) : {};
        // # Error message content
        this.error = message.error ? new Message(message.error) : {};

        /*
        ================================================================
         METHODS
        ================================================================
        */
        // # Get text for a info message
        this.getInfoBody = () => {
            if (this.info.body) {
                return this.info.body;
            }

            log.err('Unable to get a info message body', 'Body is empty');
            return '';
        };
        // # Get title for a info message
        this.getInfoHead = () => {
            if (this.info.head) {
                return this.info.head;
            }

            log.err('Unable to get a info message header', 'Header is empty');
            return '';
        };
    }
}

module.exports = PageMessage;