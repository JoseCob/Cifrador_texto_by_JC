//controllers/otherEncryptors.js
//Controlador para cifrar texto utilizando el cifrado César y almacenarlo en la base de datos con el model.
const EncryptionModel= require('../models/cipherModel');

async function miscellaneousCiphers(req, res) {
    const { originalText, cipherType } = req.body;
    console.log('Datos de la solicitud:', req.body);

    // Verificar si el campo "Texto para cifrar" está vacío
    if (!originalText) {
        console.log('No se registró ningún dato a la base de datos');
        // Redirige a la página correspondiente según el tipo de cifrado
        if (cipherType === 'octal') {
            return res.redirect(`/pageOctal?textEncryption=`);
        } else if (cipherType === 'hexadecimal') {
            return res.redirect(`/pageHexadecimal?textEncryption=`);
        }
    }

    let textEncrypted;

    // Realiza el cifrado según el tipo especificado
    if (cipherType === 'octal') {
        textEncrypted = cipherToOctal(originalText);
    } else if (cipherType === 'hexadecimal') {
        textEncrypted = cipherToHexadecimal(originalText);
    } else {
        console.error('Tipo de cifrado no válido:', cipherType);
        return res.status(400).send('Tipo de cifrado no válido');
    }

    // Verificar si el texto cifrado tiene algún valor
    if (!textEncrypted) {
        console.log('El texto cifrado está vacío');
        // Redirige a la página correspondiente según el tipo de cifrado
        if (cipherType === 'octal') {
            return res.redirect(`/pageOctal?textEncryption=`);
        } else if (cipherType === 'hexadecimal') {
            return res.redirect(`/pageHexadecimal?textEncryption=`);
        }
    }

    try {
        console.log('Texto cifrado:', textEncrypted);
        // Inserta el texto original y el texto cifrado en la base de datos
        await EncryptionModel.cipherModel(originalText, textEncrypted, null);
        // Redirige a la página correspondiente según el tipo de cifrado
        if (cipherType === 'octal') {
            res.redirect(`/pageOctal?textEncryption=${encodeURIComponent(textEncrypted)}`);
        } else if (cipherType === 'hexadecimal') {
            res.redirect(`/pageHexadecimal?textEncryption=${encodeURIComponent(textEncrypted)}`);
        }
    } catch (error) {
        console.error('Error al cifrar y almacenar el texto:', error);
        res.status(500).send(error.message);
    }
}

function cipherToOctal(originalText) {
    let textOctal = '';
    for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        const charCode = char.charCodeAt(0);

        // Si el carácter es la ñ, lo manejaremos de manera especial
        if (char === 'ñ') {
            textOctal += '303 261 ';
        } else {
            // Para otros caracteres, obtenemos su valor octal normalmente
            textOctal += charCode.toString(8) + ' ';
        }
    }
    return textOctal.trim();
}

function cipherToHexadecimal(originalText) {
    let textHexadecimal = '';
    for (let i = 0; i < originalText.length; i++) {
        const charCode = originalText.charCodeAt(i);
        textHexadecimal += charCode.toString(16).padStart(2, '0');
    }
    return textHexadecimal;
}

module.exports = {
    miscellaneousCiphers
};