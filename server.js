//server.js
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes');//Requiere la carpeta routes, del archivo routes.js para ejecutar las vistas del usuario
const dotenv = require('dotenv')//cargar variables de entorno desde un archivo ".env"
const session = require('express-session');//middleware para la gestión de sesiones en aplicaciones web, para mantener el estado de la sesión del usuario a través de múltiples solicitudes HTTP. 

//Configura dotenv para cargar las variables de entorno desde un archivo ".env"
dotenv.config();

//Configuración de express-session para manejar sesiones
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,//Clave secreta para firmar la cookie de sesión
    resave: false,//Evita la re-grabación de sesiones no modificadas.
    saveUninitialized: false,//Evita guardar sesiones vacías en el almacén de sesiones.
}));

//configura el motor de plantillas pug 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware para procesar archivos estáticos en la carpeta 'public' y 'assets'
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.json());//Middleware que analiza JSON, para procesar solicitudes POST

//Ruta raíz o inicio de la pagina al ejecutarse
app.use('/', router);

//Iniciar servidor
const port = 3000;
app.listen(port, () =>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});