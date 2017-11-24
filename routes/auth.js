const express = require('express');
const router = express.Router();
const unit = require('../units/userUnit');

router.get('/',  (req, res) => {
    console.log('Route on auth page');
    res.render('auth');
});

router.post('/login',  (req, res) => {
    unit.getUser(req.body.username, res);
});

module.exports = router;
