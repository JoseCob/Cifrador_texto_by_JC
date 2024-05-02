//routes/index.js
const express = require('express');
const router = express.Router();

// Ruta que llama el inicio de la página
//El método render('index'), visualiza el index.pug con el parametro '/' que fue declarado en el archivo server.js como: "app.use('/', router);"
router.get('/', (req, res) => { //se obtiene desde el servidor
    res.render('index', { title: 'Cifrador de textos'});//Renderiza el pug, "La vista del usuario, con su respectivo titulo de la página"
});
  
module.exports = router;