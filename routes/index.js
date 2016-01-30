var express = require('express');
var router = express.Router();

// Ponemos los controladores para las peticiones que se pueden realizar.
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
var quizController = require('../controllers/quiz_controller');


/************************** GET Home Page. ***************************/
/*********************************************************************/
router.get('/', function(req, res) {
  res.render('index');
});
/*********************************************************************/
/*********************************************************************/


/*************************** GET Autor. ******************************/
/*********************************************************************/
router.get('/autor', function(req, res) {
    res.render('autor');
});
/*********************************************************************/
/*********************************************************************/


/****************** Rutas de las Sesiones (login) ********************/
/*********************************************************************/

// Obtener el formulario a rellenar para hacer login.
router.get('/login',  sessionController.new);

// Enviar formulario para crear la sesión.
router.post('/login', sessionController.create);

/*********************************************************************/
/*********************************************************************/


/*********************** Rutas de los Usuarios ***********************/
/*********************************************************************/

// Renderiza el formulario para crear un nuevo usuario.
router.get('/users/new', userController.show);

// Ejecuta el POST de crear un usuario nuevo.
router.post('/users/new', userController.create);

// Enseña todos los usuarios que hay creados.
router.get('/users', userController.index);

/*********************************************************************/
/*********************************************************************/


/*********************** Rutas de los Quizes  ************************/
/*********************************************************************/

// Obtener la vista hecha con flux para hacer quizes.
router.get('/quizes/new',  quizController.show);

// Crear los quizes a partir de la aplicacion de Flux.
router.post('/quizes/new', quizController.create);

// Mostrar todos los quizes creados hasta el momento.
router.get('/quizes', quizController.index);


/*********************************************************************/
/*********************************************************************/


// Finalmente exportamos el enrutador creado a la aplicacion.
module.exports = router;

