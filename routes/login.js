//routes/login.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const middleWare = require('../middlewares/authentication');//Ruta que contiene la autentificacion hash y token secret en "authentication.js"

//Ruta que llama el login de la página
//El método render('login'), visualiza el "login.pug" con el parametro '/' que fue declarado en el archivo server.js como: "app.use('/', router);"
router.get('/', (req, res) => { //se obtiene desde el servidor
    // Obtener los mensajes de error de la solicitud
    const messages = req.flash('error');
    // Verificar si el usuario ha iniciado sesión, si no tiene la sesion activa, quita el icono del logout
    res.render('login', { title: 'Iniciar Sesión', user: req.user != null ? `${req.user.userName}`: '', messages: messages}); //Renderiza el pug
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/', //Ruta después del inicio de sesión con éxito
    failureRedirect: '/login', //Ruta que dirige al login, si el intento del inicio de sesión fallo
    failureFlash: true //Almacena un mensaje de error mediante el connect-flash
}), async (req, res) => {
    const token = middleWare.generateToken(req.user.id);
    res.cookie('token', token, { httpOnly: true, secure: false});
});

module.exports = router;