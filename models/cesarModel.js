//models/cesarModel.js
const db = require('../database/conexion');

// Modelo para interactuar con la tabla de la base de datos
async function create(originalText, textoCifrado, clave) {
    try {
        await db.query('INSERT INTO ciphers (originalText, textEncrypted, encryptionKey) VALUES (?, ?, ?)', [originalText, textoCifrado, clave]);
        console.log('El texto', textoCifrado, 'se almacenó en la base de datos correctamente.' );
    } catch (error) {
        console.error('Error al cifrar y almacenar el texto:', error);
        throw error;
    }
}


module.exports = {
    create
};