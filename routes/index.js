//routes/index.js
const express = require('express');
const router = express.Router();

// Rutas públicas
//Se llama el index.pug con el parametro '/' que fue declarado en el archivo routes.js como: "router.use('/', index);"
//
router.get('/', (req, res) => {
    res.render('index', { title: '¡Hola, mundo! Express'});
});
  
module.exports = router;