const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('App => Middleware[Profile] : Route to profile page');

    if (req.isAuthenticated()) {
        res.render('profile', { user : req.user });
    } else {
        res.redirect('/');
    }
});

module.exports = router;