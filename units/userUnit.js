const db = require('../database/db');

const unit = {
    addUser : (data) => {
        db.addUser(data).then((user) => {
            console.log('User "' + user.name + '" succesfully recorded with id ' + user.id);
        }).catch(error => {
            console.log('Error: ', error);
        });
    },
    getUser : (data, res) => {
        db.getUser(data).then((user) => {
            if (user) {
                console.log('User "' + user.name + '" with id ' + user.id + ' is exists');
                res.redirect('/');
            }
            res.redirect('/auth#login');
        }).catch((err) => {
            console.log(err);
            process.exit(1);
        });
    }
};

module.exports = unit;

