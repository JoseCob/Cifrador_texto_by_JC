const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('ciphers', {title: 'Cifrar Texto'});
});

module.exports = router;