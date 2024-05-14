//models/cipherModel.js
const db = require('../database/conexion');

// Modelo para interactuar con la base de datos de los cifradores = ciphers
async function cipherModel(originalText, textEncrypted, encryptionKey, userId = null) {
    try {
        await db.query('INSERT INTO ciphers (originalText, textEncrypted, encryptionKey, userId) VALUES (?, ?, ?, ?)', [originalText, textEncrypted, encryptionKey, userId]);
        console.log('El texto:', textEncrypted, '¡se ha almacenado en la base de datos satisfactoriamente!.' );
        console.log('Usuario identificado:', userId);
    } catch (error) {
        console.error('Error al cifrar y almacenar el texto:', error);
        throw error;
    }
}

module.exports = {
    cipherModel
};