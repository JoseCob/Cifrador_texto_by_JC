const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('octal', {title: 'Cifrador Octal'});
});

module.exports = router;