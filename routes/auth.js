const express = require('express');
const router = express.Router();
const unit = require('../controllers/user-controller');
const log = require('../config/eye')('router[auth]');
const Page = require('../classes/page/page');

/*
================================================================
 Auth page middleware the class
================================================================
 Present of the processing of a requests to the auth page
================================================================
*/

router.get('/',  (req, res) => {
    log.info('Route to the auth page');

    let page = new Page({
        id : 'auth',
        content : {
            user : req.user
        }
    });

    res.render(page.id, page);
});
router.post('/login',  (req, res) => {
    log.info('Post on the login page');
    unit.login(req, res);
});
router.post('/signup',  (req, res) => {
    log.info('Post on the signup page');
    unit.signup(req, res);
});

module.exports = router;
