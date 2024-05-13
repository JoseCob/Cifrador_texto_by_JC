//routes/index.js
const express = require('express');
const router = express.Router();

// Ruta que llama el inicio de la página
//El método render('index'), visualiza el index.pug con el parametro '/' que fue declarado en el archivo server.js como: "app.use('/', router);"
router.get('/', (req, res) => { //se obtiene desde el servidor
    //Renderiza el pug, "La vista del usuario, con su respectivo titulo de la página"
    res.render('index', { title: req.user != null? `¡Bienvenido, ${req.user.userName}! a la página ENCRTEXT.`: '¡Bienvenido! a la página ENCRTEXT.', user: req.user != null ? `${req.user.nombre}`: ''});
});

module.exports = router;