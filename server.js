//constantes básicas y necesarias para trabajar con express
const express = require('express'); //framework principal express
const app = express(); //Instancia o inicializador de la aplicación Express.
const path = require('path'); //Proporciona utilidades para trabajar con rutas de archivos y directorios

//constantes que utiliza mi aplicación para manejar múltiples directorios 
const router = require('./routes/routes'); //Requiere la carpeta routes, del archivo routes.js para ejecutar las vistas del usuario
const dotenv = require('dotenv') //cargar variables de entorno desde un archivo ".env"
const session = require('express-session'); //middleware para la gestión de sesiones en aplicaciones web, para mantener el estado de la sesión del usuario a través de múltiples solicitudes HTTP. 
const users = require('./database/tables/users'); //Archivo contenedor de querys para MySQL, en este caso para registrar usuarios
const middleWare = require('./middlewares/authentication'); //middleware personalizado. Ruta que contiene la autentificacion hash y token secret 'JWT' en "authentication.js"
const cookieParser = require('cookie-parser'); //middleware que permite acceder fácilmente a las cookies, analiza las cookies de la solicitud y las hace accesibles en req.cookies
const passport = require('passport'); //middleware de autenticación.  Proporciona una forma sencilla y flexible de autenticar usuarios en aplicaciones web y servicios API. Permite la autenticación de TOKENS 'JWT' 
const LocalStrategy = require('passport-local').Strategy; //Sirve para autenticar usuarios utilizando un nombre de usuario y una contraseña almacenados localmente en una base de datos. Es una estrategia de autenticación proporcionada por Passport 
const flash = require('connect-flash');

//Configuraciones
dotenv.config(); //Configura dotenv para cargar las variables de entorno desde un archivo ".env"
app.use(cookieParser()); //Configura Cookie Parser. Nos permite acceder fácilmente a las cookies den las peticiones del servidor entrantes. 
app.use(flash()); //Configura connect-flash

//Configuración de express-session para manejar sesiones
app.use(session({
    secret: process.env.SESSION_SECRET, //Clave secreta para firmar la cookie de sesión
    resave: false, //Evita la re-grabación de sesiones no modificadas.
    saveUninitialized: false //Evita guardar sesiones vacías en el almacén de sesiones.
}));

//Configura el passport.js
app.use(passport.initialize()); //inicializa el proceso de autenticación de Passport
app.use(passport.session()); //Esto permite que Passport recuerde la autenticación del usuario entre diferentes páginas o acciones dentro de la aplicación.

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  async (userName, password, done) => { //Obtiene los datos a verificar de la vista login llamado 'login.pug', las credenciales del usuario
    try {
      const user = await users.getuserName(userName); //Busca al usuario en la base de datos por su nombre de usuario del metodo users, que contiene la logica del registro de los usuarios
      if (!user) { //Si no se encuentra el usuario, devuelve un error
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const authPassword = await middleWare.comparePassword(password, user.passwordHash); //Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
      if (!authPassword) { //Si las contraseñas no coinciden, devuelve un error
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user); //Si las credenciales son correctas, devuelve el usuario autenticado
    } catch (err) {
      return done(err); //Maneja cualquier error que ocurra durante el proceso de autenticación
    }
  }
));

//serializador y deserialidor de usuarios con Passport.js
passport.serializeUser((user, done) => { //Función para convertir un usuario en un identificador único que se puede almacenar en la sesión cuando se autentica correctamente. 
    done(null, user.id); //Se serializa el usuario utilizando su ID
});
passport.deserializeUser(async (id, done) => { //Función para recuperar un usuario a partir del identificador único almacenado en la sesión
    await users.getIdUser(id).then((user) => { //se está utilizando el ID del usuario para buscar el usuario correspondiente en la base de datos 
      done(null, user); // Indica que el usuario ha sido deserializado correctamente
    }).catch((error) => {
      done(error, null);
    });
});

//Este middleware se utiliza para analizar los datos enviados mediante formularios HTML. Parsea los datos codificados en URL y los expone en req.body. Ejemplo: 'application/x-www-form-urlencoded)'
app.use(express.urlencoded({ extended: true })); //Esto se debe de cargar antes de la Ruta raíz o inicio de la página al ejecutarse

//Ruta para cerrar sesión desde la Ruta raíz al ejecutarse
app.get('/logout', async (req, res) => {
    await req.logout(async (err) => {
      if (err) {
        // Manejo del error, si es necesario
        console.error(err);
      }

      // Eliminar la sesión completa del usuario
      await req.session.destroy((err) => {
        if (err) {
          console.error('Error al destruir la sesión:', err);
          return res.status(500).send('Error al cerrar sesión');
        }
        console.log('Sesión finalizado correctamente');
      });

      // Eliminar el contenido del almacén de sesiones
      await req.sessionStore.clear((err) => {
        if (err) {
          console.error('Error al limpiar el almacén de sesiones:', err);
          return res.status(500).send('Error al cerrar sesión');
        }
        console.log('Limpieza finalizado correctamente');
      });
      res.clearCookie('token');
      res.redirect('/'); // Redirigir a la página principal u otra página de tu elección
    });
  });

//configura el motor de plantillas pug 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware para procesar archivos estáticos en la carpeta 'public' y 'assets'
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.json());//Middleware que analiza JSON, para procesar solicitudes POST

//Ruta raíz o inicio de la página al ejecutarse
app.use('/', router);

//Middleware que se utiliza para manejar errores en la aplicación.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});
  
//Iniciar servidor
const port = 3000;
app.listen(port, () =>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});