const express = require('express');
const passport = require('passport');
const router = express.Router();
const middleWare = require('../middlewares/authentication');//Ruta que contiene la autentificacion hash y token secret en "authentication.js"

//Ruta que llama el login de la página
//El método render('login'), visualiza el "login.pug" con el parametro '/' que fue declarado en el archivo server.js como: "app.use('/', router);"
router.get('/', (req, res) => { //se obtiene desde el servidor
    const user = req.user != null ? `Cifrador de Textos ${req.user.userName}`: ''; // Verificar si el usuario ha iniciado sesión, si no tiene la sesion activa, quita el icono del logout
    res.render('login', { title: 'Iniciar Sesión', user}); //Renderiza el pug
});

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), async (req, res) => {
    const token = middleWare.generateToken(req.user.id);

    res.cookie('token', token, { httpOnly: true, secure: false});
});

module.exports = router;