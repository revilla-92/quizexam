var models = require('../models');

/****************************** Rutas ******************************/
/*******************************************************************/

/* 
 * Con este metodo renderizamos la vista hecho con Flux para crear Quizes.
 */
exports.show = function(req, res, next) {
	res.render('quizes/new');
};


exports.create = function(req, res, next){

	console.log(req.body);
}

/*******************************************************************/
/*******************************************************************/