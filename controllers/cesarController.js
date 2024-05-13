// controllers/cesarController.js
// Controlador para cifrar texto utilizando el cifrado César y almacenarlo en la base de datos.
const TextoCifrado = require('../models/cesarModel');

// Función para cifrar el texto original y guardarlo en la base de datos por el controlador
async function cifrarTexto(req, res) {
    const { originalText, clave } = req.body;
    console.log('Datos del cuerpo de la solicitud:', req.body);
    console.log('Clave recibida:', clave);

    // Verificar si el texto está vacío
    if (!originalText) {
        // Renderizar la misma página con el texto cifrado vacío
        console.log('No se registró ningún dato en la base de datos');
        return res.redirect(`/pageCesar?textoCifrado=`);
    }

    if (isNaN(clave)) {
        return res.status(400).send("La clave no es un número válido");
    }

    // Cifrar el texto utilizando la función cifrarCesar local
    const textoCifrado = cifrarCesar(originalText, parseInt(clave));
    
    try {
        // Insertar el texto original y el texto cifrado en la base de datos utilizando el modelo
        await TextoCifrado.create(originalText, textoCifrado, parseInt(clave));
        // Redirigir al usuario a la misma página con el texto cifrado como parámetro en la URL
        res.redirect(`/pageCesar?textoCifrado=${encodeURIComponent(textoCifrado)}`);
    } catch (error) {
        console.error('Error al cifrar y almacenar el texto:', error);
        res.status(500).send(error.message);
    }
}

// Función para cifrar en César
function cifrarCesar(texto, clave) {
    const alfabeto = 'abcdefghijklmnñopqrstuvwxyz'; // Alfabeto en minúsculas, incluyendo la "ñ"

    // Convertir el texto a minúsculas para simplificar el cifrado
    texto = texto.toLowerCase();

    // Convertir la clave a un número entero
    clave = parseInt(clave);

    let textoCifrado = '';

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];
        const indice = alfabeto.indexOf(caracter); // Obtener el índice del caracter en el alfabeto

        if (indice === -1) {
            // Si el caracter no está en el alfabeto, añadirlo al texto cifrado sin modificarlo
            textoCifrado += caracter;
        } else {
            // Calcular el nuevo índice desplazado por la clave
            let nuevoIndice = (indice + clave) % alfabeto.length; // Usamos la longitud del alfabeto para mantener el rango correcto

            // Manejar el caso especial cuando el nuevo índice sea negativo
            if (nuevoIndice < 0) {
                nuevoIndice += alfabeto.length;
            }

            // Obtener el caracter cifrado utilizando el nuevo índice
            const caracterCifrado = alfabeto[nuevoIndice];

            textoCifrado += caracterCifrado;
        }
    }

    return textoCifrado;
}

//Exportamos el controlador
module.exports = {
    cifrarTexto
};