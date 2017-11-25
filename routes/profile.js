const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.render('profile', { req : req.params.id });
});

module.exports = router;