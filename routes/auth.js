const express = require('express');
const router = express.Router();
const unit = require('../units/user-unit');

router.get('/',  (req, res) => {
    console.log('App => Middleware[Auth] : Route to the auth page');
    res.render('auth');
});
router.post('/login',  (req, res) => {
    console.log('App => Middleware[Auth] : Route to the login page');
    unit.login(req, res);
});
router.post('/signup',  (req, res) => {
    console.log('App => Middleware[Auth] : Route to the signup page');
    unit.signup(req, res);
});

module.exports = router;
