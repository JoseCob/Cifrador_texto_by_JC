//models/cipherModel.js
const db = require('../database/conexion');

// Modelo para interactuar con la base de datos de los cifradores
async function cipherModel(originalText, textEncrypted, encryptionKey) {
    try {
        await db.query('INSERT INTO ciphers (originalText, textEncrypted, encryptionKey) VALUES (?, ?, ?)', [originalText, textEncrypted, encryptionKey]);
        console.log('El texto:', textEncrypted, '¡se ha almacenado en la base de datos satisfactoriamente!.' );
    } catch (error) {
        console.error('Error al cifrar y almacenar el texto:', error);
        throw error;
    }
}

module.exports = {
    cipherModel
};