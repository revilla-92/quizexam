var express = require('express');
var router = express.Router();


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


/************************ Rutas de las sesiones **********************/

// Obtener el formulario a rellenar para hacer login.
// router.get('/login',  sessionController.new); 
             
// Enviar formulario para crear la sesión.
// router.post('/login', sessionController.create); 

// Destruir la sesión actual.
// router.get('/logout', sessionController.destroy); 
/*********************************************************************/



// Finalmente exportamos el enrutador creado a la aplicacion.
module.exports = router;