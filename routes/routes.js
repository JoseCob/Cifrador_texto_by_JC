//routes/routes.js
const express = require('express');
const router = express.Router();

// Importa las rutas especificas de los archivos js en la carpeta routes
const index = require('./index');// Llama al archivo index.js con la variable index
const login = require('./login');// Llama al archivo login.js con la variable login
const register = require('./register'); // Llama el archivo register.js
const ciphers = require('./ciphers');// Llama el archivo ciphers.js

/*
Configura las rutas para utilizar las vistas del usuario, ejemplo:
Al usar '/' estamos indicando que para llamar el archivo index.pug con el 'index.js'. Se requiere llamarlo con '/' 
en vez de 'index.pug' en relación a la variable index.
*/
router.use('/', index);//Usa el archivo index.js mediante el parametro '/' con la variable index para mostrar el resultado de la vista al usuario
router.use('/login', login);//Usa el archivo login.js mediante el parametro '/login' con la variable login para mostrar el resultado de la vista al usuario
router.use('/register', register);//Usa el archivo register.js mediante el parametro '/register' con la variable register para mostrar el resultado de la vista al usuario
router.use('/ciphers', ciphers);//Usa el archivo ciphers.js mediante el parametro '/ciphers' con la variable ciphers para mostrar el resultado de la vista al usuario

/*Es necesario incluir el enrutador, para manejar las solicitudes HTTP y definir las rutas, 
para que otros archivos de la propia aplicación puedan ser utilizados*/
module.exports = router;
