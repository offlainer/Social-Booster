const express = require('express');
const router = express.Router();
const accountUnit = require('../controllers/account-controller');
const Page = require('../classes/page/page');
const log = require('../config/eye')('router[profile]');

/*
================================================================
 Profile page middleware the class
================================================================
 Present of the processing of a requests to the profile page
================================================================
*/

router.get('/', (req, res) => {
    log.info('Route to profile page');

    if (req.isAuthenticated()) {
        let page = new Page({
            id : 'profile',
            content : {
                user : req.user
            }
        });

        res.render(page.id, {page : page});
    } else {
        log.info(`Can't show the page. User is not authorized`);

        res.redirect('/');
    }
});
router.post('/bind-account',  (req, res) => {
    log.info('Post to the VK auth page');

    if ( req.body.status !== 'connected') {
        let message = 'Bad auth content or server internal API error';
        log.err('Can`t auth a user with vk', message);
        res.sendStatus(500);
    } else {
        if (req.body.session.user) {
            accountUnit.save(req, res);
        } else {
            let message = 'Empty body request';
            log.err('Can`t auth a user with vk', message);
            res.sendStatus(500);
        }
    }
});

module.exports = router;