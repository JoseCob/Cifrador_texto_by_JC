const express = require('express');
const router = express.Router();

//Ruta que llama el login de la página
//El método render('login'), visualiza el "login.pug" con el parametro '/' que fue declarado en el archivo server.js como: "app.use('/', router);"
router.get('/', (req, res) => { //se obtiene desde el servidor
    res.render('login', { title: 'Iniciar Sesión'}); //Renderiza el pug
});

module.exports = router;