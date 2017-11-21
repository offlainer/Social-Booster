const express = require('express');
const router = express.Router();

/* GET registration form */
router.get('/',  (req, res, next) => {
    console.log('Route on auth page');
    next();
});

module.exports = router;
