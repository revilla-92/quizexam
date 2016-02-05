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
router.get('/login',
	sessionController.new
);

// Enviar formulario para crear la sesión.
router.post('/login',
	sessionController.create
);

// Destruye la session.
router.get('/logout',
	sessionController.destroy
);

/*********************************************************************/
/*********************************************************************/


/*********************** Rutas de los Usuarios ***********************/
/*********************************************************************/

// Renderiza el formulario para crear un nuevo usuario.
router.get('/users/new',
	userController.show
);

// Ejecuta el POST de crear un usuario nuevo.
router.post('/users/new',
	userController.create
);

// Enseña todos los usuarios que hay creados.
router.get('/users',
	sessionController.loginRequired,
	sessionController.autologout,
	userController.index
);

// Elimina a un usuario, solo si es administrador.
router.post('/users/delete/:userid([0-9]+)',
	sessionController.autologout,
	sessionController.loginRequired,
	sessionController.isAdmin,
	userController.destroy
);

// Enseña la vista para editar un usuario.
router.get('/users/edit/:userid([0-9]+)',
	sessionController.autologout,
	sessionController.loginRequired,
	userController.edit
);

// Edita un usuario.
router.post('/users/edit/:userid([0-9]+)',
	sessionController.autologout,
	sessionController.loginRequired,
	userController.update
);

/*********************************************************************/
/*********************************************************************/


/*********************** Rutas de los Quizes  ************************/
/*********************************************************************/

// Obtener la vista hecha con flux para hacer quizes.
router.get('/quizes/new',
	sessionController.loginRequired,
	sessionController.autologout,
	quizController.show
);

// Crear los quizes a partir de la aplicacion de Flux.
router.post('/quizes/new',
	sessionController.loginRequired,
	sessionController.autologout,
	quizController.create
);

// Mostrar todos los quizes creados hasta el momento.
router.get('/quizes',
	sessionController.loginRequired,
	sessionController.autologout,
	quizController.index
);

// Cuando redenrizamos la vista con Flux también mandamos el estado 
router.get('/api/quiz', 
	quizController.loadQuizesToFlux
);

// Elimina un Quiz.
router.post('/quizes/delete/:quizid([0-9]+)',
	sessionController.loginRequired,
	sessionController.autologout,
	quizController.destroy
);

// Enseña la vista para editar un quiz.
router.get('/quizes/edit/:quizid([0-9]+)',
	sessionController.autologout,
	sessionController.loginRequired,
	quizController.edit
);

// Edita un quiz.
router.post('/quizes/edit/:quizid([0-9]+)',
	sessionController.autologout,
	sessionController.loginRequired,
	quizController.update
);


/*********************************************************************/
/*********************************************************************/


// Finalmente exportamos el enrutador creado a la aplicacion.
module.exports = router;

