const express = require('express');
const config = require('../config/config')();
const router = express.Router();
const unit = require(config.appRoot + '/units/userUnit');

router.get('/',  (req, res) => {
    console.log('Route on auth page');
    res.render('auth');
});

router.post('/',  (req, res) => {
    unit.addUser(req.body);

    res.redirect('/');
});

module.exports = router;
