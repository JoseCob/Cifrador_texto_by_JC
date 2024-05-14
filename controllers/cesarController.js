//controllers/cesarController.js
/*Este controlador unicamente contiene los elementos a registrar en relacion al cifrado César = Vista Cesar.pug*/
//Controlador para cifrar texto utilizando el cifrado César y almacenarlo en la base de datos con el model.
const EncryptionModel= require('../models/cipherModel');

//Controlador que contiene la función para cifrar el texto original y guardarlo en la base de datos
async function encryptText(req, res) {
    const { originalText, encryptionKey } = req.body; //Datos del cesar.pug
    console.log('Cifrando en Cesar');
    console.log('Datos de la solicitud:', req.body); //Obtine los resultados de los campos en cesar.pug y lo muestra como mensaje

    //Verificar si el campo "Texto para cifrar" está vacío
    if (!originalText) {
        // Renderizar la misma página del cifrador si el campo "Texto para cifrar" está vacío
        console.log('No se registró ningún dato a la base de datos');
        return res.redirect(`/pageCesar?textEncryption=`); //Redirigir a la página del cifrado Cesar.pug con el valor vacío
    }

    //Verifica si la clave del cifrado es un número valido mediante el value por ser cadena de texto al usar select
    const encryptionKeyInt = parseInt(encryptionKey);
    //Verifica si es un valor númerico valido del propio select, despues de haber convertido la cadena de texto en número
    if (isNaN(encryptionKey)) { 
        //Si el número no esta dentro del rango, manda mensaje de error
        return res.status(400).send("La clave no es un número válido");
    }

    //Cifrar el texto utilizando la función cipherCesar mediante el texto original y la clave
    const textEncrypted = cipherCesar(originalText, encryptionKeyInt);
    
    try {
        //Obtiene el ID del usuario si está autenticado tomado directo del model cipherModel.js
        const userId = req.isAuthenticated() ? req.user.id : null;

        //Insertar el texto original y el texto cifrado con la clave y el usuario en la base de datos utilizando el modelo de los cifradores
        await EncryptionModel.cipherModel(originalText, textEncrypted, encryptionKey, userId);
        //Redirigir al usuario a la página del cifrado César.pug con el texto cifrado como parámetro en la URL
        res.redirect(`/pageCesar?textEncryption=${encodeURIComponent(textEncrypted)}`);//Redirige con el valor cifrado en el controlador de cipherCesar
    } catch (error) {
        console.error('Error al cifrar y almacenar el texto:', error);
        res.status(500).send(error.message);
    }
}

//Controlador que contiene la función para cifrar en César
function cipherCesar(originalText, encryptionKey) { //Se obtiene el texto Original con la clave a cifrar 
    const alfabeto = 'abcdefghijklmnñopqrstuvwxyz'; // Alfabeto en minúsculas, incluyendo la "ñ"

    // Convertir el texto original a minúsculas para simplificar el cifrado del César
    originalText = originalText.toLowerCase();

    // Convertir la clave a un número entero, de ser cadena de texto => número por el selector de las claves
    encryptionKey = parseInt(encryptionKey);

    let textEncryption = ''; //Obtiene un valor vacío de forma preterminada

    //Operador que hacer el cifrado César 
    for (let i = 0; i < originalText.length; i++) {
        const caracter = originalText[i];
        const indice = alfabeto.indexOf(caracter); // Obtener el índice del caracter en el alfabeto

        if (indice === -1) {
            // Si el caracter no está en el alfabeto, añadirlo al texto cifrado sin modificarlo
            textEncryption += caracter;
        } else {
            // Calcular el nuevo índice desplazado por la clave
            let nuevoIndice = (indice + encryptionKey) % alfabeto.length; // Usamos la longitud del alfabeto para mantener el rango correcto

            // Manejar el caso especial cuando el nuevo índice sea negativo
            if (nuevoIndice < 0) {
                nuevoIndice += alfabeto.length;
            }

            // Obtener el caracter cifrado utilizando el nuevo índice
            const caracterCifrado = alfabeto[nuevoIndice];

            textEncryption += caracterCifrado;
        }
    }

    return textEncryption;
}

//Exportamos el controlador
module.exports = {
    encryptText
};