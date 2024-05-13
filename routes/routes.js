//routes/routes.js
const express = require('express');
const router = express.Router();
const cesarController = require('../controllers/cesarController');//Controlador para cifrar en Cesar
const otherEncryptors = require('../controllers/otherEncryptors');//Controlador de otros cifradores 

// Importa las rutas especificas de los archivos js en la carpeta routes
const index = require('./index');// Llama al archivo index.js con la variable index
const login = require('./login');// Llama al archivo login.js con la variable login
const register = require('./register'); // Llama el archivo register.js
const registerUser = require('./register-user') //Llama el archivo donde contiene los usuarios ya registrados
const listCiphers = require('./ciphers');// Llama el archivo ciphers.js
const cipherCesar = require('./cesar');// Llama el archivo cesar.js
const cipherOctal = require('./octal');
const cipherBase64 = require('./base64');
const cipherHexadecimal = require('./hexadecimal');

/*
Configura las rutas para utilizar las vistas del usuario, ejemplo:
Al usar '/' estamos indicando que para llamar el archivo index.pug con el 'index.js'. Se requiere llamarlo con '/' 
en vez de 'index.pug' en relación a la variable index.
*/
router.use('/', index);//Usa el archivo index.js mediante el parametro '/' con la variable index para mostrar el resultado de la vista al usuario
router.use('/login', login);//Usa el archivo login.js mediante el parametro '/login' con la variable login para mostrar el resultado de la vista al usuario
router.use('/register', register);//Usa el archivo register.js mediante el parametro '/register' con la variable register para mostrar el resultado de la vista al usuario
router.use('/register-user', registerUser);
router.use('/ciphers', listCiphers);//Usa el archivo ciphers.js mediante el parametro '/ciphers' con la variable listCiphers para mostrar el resultado de la vista al usuario
router.use('/pageCesar', cipherCesar);//Usa el archivo cesar.js mediante el parametro '/pageCesar' con la variable cipherCesar para mostrar el resultado de la vista al usuario
router.use('/pageOctal', cipherOctal);
router.use('/pageBase64', cipherBase64);
router.use('/pageHexadecimal', cipherHexadecimal);

/*Rutas que llaman las operaciones de cifrado*/
//Ruta del cifrado Cesar
router.post('/encrypt-cesar', cesarController.encryptText);//Llamamos al controlador para cifrar en Cesar y la función para cifrar texto a cesar
router.post('/otherEncryptors', otherEncryptors.miscellaneousCiphers)

/*Es necesario incluir el enrutador, para manejar las solicitudes HTTP y definir las rutas, 
para que otros archivos de la propia aplicación puedan ser utilizados*/
module.exports = router;