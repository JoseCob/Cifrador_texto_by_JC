const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('hexadecimal', {title: 'Cifrador Hexadecimal'});
});

module.exports = router;