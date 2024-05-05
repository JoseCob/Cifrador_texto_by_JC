const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('ciphers', {title: 'Lista de cifradores'});
});

module.exports = router;