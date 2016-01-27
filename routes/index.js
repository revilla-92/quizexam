var express = require('express');
var router = express.Router();

// Ponemos los controladores para las peticiones que se pueden realizar.
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


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

// Destruir la sesión actual.
// router.get('/logout', sessionController.destroy);

/*********************************************************************/
/*********************************************************************/


/*********************** Rutas de los Usuarios ***********************/
/*********************************************************************/

// Renderiza el formulario para crear un nuevo usuario.
router.get('/users', userController.index);

// Ejecuta el POST de crear un usuario nuevo.
router.post('/users', userController.create);

/*********************************************************************/
/*********************************************************************/

// Finalmente exportamos el enrutador creado a la aplicacion.
module.exports = router;




