//routes/routes.js
const express = require('express');
const router = express.Router();

// Importa las rutas especificas de los archivos js en la carpeta routes
const index = require('./index');// Llama al archivo index.js con la variable index

/*Configura las rutas para utilizarla para la vista del usuario, ejemplo:
Al usar '/' estamos indicando que para llamar al index.js con el index.pug, se requiere llamarlo
con '/' en vez de 'index.pug'
*/
router.use('/', index);//Usa el archivo index.js mediante el parametro '/' con la variable index para mostrar el resultado

/*Es necesario para el enrutador, para manejar solicitudes HTTP y definir rutas, 
para que otros archivos de la aplicación puedan ser usados*/
module.exports = router;
