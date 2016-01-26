var express = require('express');
var router = express.Router();

// Ponemos los controladores para las peticiones que se pueden realizar.
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


/************************** GET Home Page. ***************************/
router.get('/', function(req, res) {
  res.render('index');
});
/*********************************************************************/


/***************************** GET Autor. ****************************/
router.get('/autor', function(req,res,next) {
    res.render('autor');
});
/*********************************************************************/


/************************** Rutas del login **************************/

// Mostrar el formulario para registrarse (signup).
router.get('/signup', function(req, res, next) {
	res.render('users/new');
});

// Mostrar el formulario para logear (login).
router.get('/login_show', function(req, res, next) {
	res.render('session/new');
});

router.get('/login', function(req, res, next){
	
})

/*********************************************************************/



// Finalmente exportamos el enrutador creado a la aplicacion.
module.exports = router;