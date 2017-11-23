const express = require('express');
const router = express.Router();
const unit = require('../units/userUnit');

router.get('/',  (req, res) => {
    console.log('Route on auth page');
    res.render('auth');
});

router.post('/',  (req, res) => {
    unit.addUser(req.body);

    res.redirect('/');
});

module.exports = router;
