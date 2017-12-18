const PageMessage = require('./page-message');
const config = require('../../config/config')();
const log = require('../../config/eye')('model[Page]');

/*
================================================================
 Page the class
================================================================
 Present of a html page with some contents
================================================================
*/

class Page {
    constructor (page = {}) {

        /*
        ================================================================
         FIELDS
        ================================================================
        */
        // # Page ID
        this.id = page.id ? page.id : null;
        // # Title
        this.title = page.title ? page.title : config.appName ;
        // # Some page content
        this.content = page.content ? page.content : {};
        // # Message on the page
        this.message = new PageMessage(page.message);

        /*
        ================================================================
         METHODS
        ================================================================
        */
        // # Get a page title
        this.getTitle = () => {
            return this.title;
        };
        // # Get a page variables
        this.getContent = () => {
            return this.content;
        };
        // # Get a page messages
        this.getMessage = () => {
            return this.message;
        };
    }
}

module.exports = Page;