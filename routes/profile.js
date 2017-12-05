const express = require('express');
const router = express.Router();
const unit = require('../controllers/account-controller');
const log = require('../config/eye')('router[profile]');

router.get('/', (req, res) => {
    log.info('Route to profile page');

    if (req.isAuthenticated()) {
        res.render('profile', { user : req.user });
    } else {
        res.redirect('/');
    }
});
router.post('/bind-vk',  (req, res) => {
    log.info('Post to the VK auth page');

    if ( req.body.status !== 'connected') {
        let message = 'Bad auth data or server internal API error';
        log.err('Can`t auth a user with vk', message);
        res.sendStatus(500);
    } else {
        if (req.body.session.user) {
            unit.save(req, res);
        } else {
            let message = 'Empty body request';
            log.err('Can`t auth a user with vk', message);
            res.sendStatus(500);
        }
    }
});

module.exports = router;