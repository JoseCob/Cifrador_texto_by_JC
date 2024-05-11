const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const user = req.user != null ? `Cifrador de Textos ${req.user.userName}`: ''; // Verificar si el usuario ha iniciado sesión, si no tiene la sesion activa, quita el icono del logout
    res.render('cesar', {title: 'Cifrador Cesar', user});
});

module.exports = router;