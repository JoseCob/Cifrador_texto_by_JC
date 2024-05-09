const mysql2 = require('mysql2');
const dotenv = require('dotenv');

// Configura DotEnv
dotenv.config();

// Crear pool de conexiones a la base de datos MySQL
const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/*Obtiene la conexión pool cada vez que quiera interactuar con la base de datos MySQL.
Con el fin de evitar establecer una nueva conexión cada vez que quiera utilizar la bd.*/
function mysqlConnection(){//Se obtiene el pool de la conexión, mediante el metodo mysqlConnection()
    return db.promise().getConnection();
}

module.exports = {
    mysqlConnection
}