//server.js
const express = require('express');
const app = express();
const port = 3000;

//Iniciar servidor
app.listen(port, () =>{
    console.log(`Servidor Express escuchando en http:/localhost:${port}`);
});