const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('base64', {title: 'Cifrador Base64'});
});

module.exports = router;