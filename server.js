//server.js
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes'); // Requiere la carpeta routes, del archivo routes.js para ejecutar las vistas del usuario

//configura el motor de plantillas pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());// Middleware para procesar solicitudes JSON

//Ruta raíz o inicio de la pagina al ejecutarse
app.use('/', router);

//Iniciar servidor
const port = 3000;
app.listen(port, () =>{
    console.log(`Servidor iniciado en http:/localhost:${port}`);
});