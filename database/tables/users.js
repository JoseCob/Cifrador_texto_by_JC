/* Este script, se encarga de registrar nuevos usuarios con la ayuda de la vista llama: "register.pug", 
genera consultas que obtiene el nombre del usuario y su respectivo ID, con el fin de poder utilizar estos recursos en algún momento de la página */
const db  = require('../conexion');//requiere llamar la constante db que declaramos en el archivo: "conexion.js" para insertar y consultar datos del MySQL

//Función para insertar un nuevo usuario en la base de datos de MySQL
async function register(firstName, lastName, userName, email, password){
    try {
        const connection = await db.getConnection();
        await connection.query('INSERT INTO users (firstName, lastName, userName, email, passwordHash) VALUES (?,?,?,?,?)', [firstName, lastName, userName, email, password]);
        console.log('Usuario insertado correctamente'); //Muestra en pantalla que se registro un usuario exitosamente
        connection.release(); // Liberar la conexión
    } catch (error) {
        console.error('Error al insertar usuario:', error); //Muestra un mensaje en pantalla, de que hubo ub problema al registrar el usuario
        throw error;
    } 
}

// Función para obtener un usuario por su nombre de usuario
async function getuserName(userName) { //Función que obtiene el usuario con solo el nombre de usuario "userName" de MySQL
    try {
        const connection = await db.getConnection();
        const [results] = await connection.query( //Espera la consulta mediante la constante conection con el metodo qry= "query"
            'SELECT * FROM users WHERE userName = ?', [userName]
        );
        connection.release(); // Liberar la conexión
        return results[0];
    } catch (error){
        console.error('Error al obtener el nombre del usuario: ', error);
        throw error;
    }
}

// Función para obtener el ID del usuario
async function getIdUser(id){// Función  que obtiene por id
    try{
        const connection = await db.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM users WHERE id = ?', [id]
        );
        connection.release(); // Liberar la conexión
        return results[0];
    } catch (error) {
        console.error('Error al obtener el ID del usuario: ', error);
        throw error;
    }
}

module.exports = {
    register,
    getuserName,
    getIdUser
}