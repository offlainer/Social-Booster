const express = require('express');
const router = express.Router();
const log = require('../config/eye')('router[profile]');

router.get('/', (req, res) => {
    log.info('Route to profile page');

    if (req.isAuthenticated()) {
        res.render('profile', { user : req.user });
    } else {
        res.redirect('/');
    }
});

module.exports = router;