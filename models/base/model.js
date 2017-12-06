
class Model {
    constructor() {
        /* Fields list that should not return when need to send it to the client side
            or save it in the database
         */
        this.ignored = {
            /* the client side of ignore list */
            clientFields : [],
            /* the database of ignore list */
            dbFields : []
        }
    }
    /* Get an instance with a ignored fields for the client side */
    client() {
        return this.__ignored('client');
    };
    /* Get an instance with a ignored fields for the database */
    db() {
        return this.__ignored('db');
    };
    /* Returns an filtered instance for the client side or the database
    *  #private
    *  @param type : string // For the client side or the database
    * */
    __ignored(type) {
        let thing = {},
        fields = type === 'client' ?
            this.ignored.clientFields :
            this.ignored.dbFields;

        for (let prop in this) {
            if (fields.indexOf(prop) === -1) {
                thing[prop] = this[prop];
            }
        }
        delete thing.ignored;

        return thing;
    }
}

module.exports = Model;