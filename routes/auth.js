const express = require('express');
const router = express.Router();

/* GET registration form */
router.get('/signup',  (req, res, next) => {
    res.send('You are signed up');
    next();
});

module.exports = router;
