const express = require('express');
const router = express.Router();
const unit = require('../controllers/user-controller');
const log = require('../config/eye')('router[auth]');

router.get('/',  (req, res) => {
    log.info('Route to the auth page');
    res.render('auth');
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
