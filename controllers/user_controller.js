var models = require('../models');

/*********************** Funciones Auxiliares ***********************/
/********************************************************************/

function isEmpty(value){
	return (value == null || value.length === 0);
}

/********************************************************************/
/********************************************************************/


/****************************** Rutas ******************************/
/*******************************************************************/

/* 
 * Con este metodo renderizamos la vista del formulario para crear un nuevo usuario.
 */
exports.index = function(req, res, next) {
	res.render('users/new');
};


/*
 * Con este metodo creamos en la BBDD un nuevo usuario a partir de los datos recogidos en el formulario.
 */
exports.create = function(req, res, next) {

	// Si algun campo esta vacio sacamos un error y sino creamos el usuario con los datos pasados.
	if ( isEmpty(req.body.login) || isEmpty(req.body.password) || isEmpty(req.body.email) ) {
		console.log('No se ha introducido todos los campos, que son obligatorios.');
		req.flash('error', 'Todos los campos son obligatorios.');
		res.render('users/new');
		return;

	}else{

		console.log('Se han introducido todos los campos.');

		// Creamos el usuario con esos datos.
		var user = models.User.build({
			login: req.body.login,
			email: req.body.email,
			password:  req.body.password
        });

		// El login debe ser unico, buscamos en la BBDD para que no haya ningun login igual.
		models.User.find({where: {login: req.body.login}})
		.then(function(user_existente){

			// Si ha tenido exito y el usuario existe mandamos un error.
			if(user_existente){

				console.log('El usuario ya existe.');
				req.flash('error', 'El usuario que quiere crear ya esta escogido.');
				res.render('users/new');

			}else{

				// Si no hay errores y el usuario no existe entonces lo guardamos.
				user.save()
					.then(function(user){
						console.log('Usuario: ' + user.login + ' creado con éxito.');
						req.flash('success', 'Usuario: ' + user.login + ' creado con éxito.');
						res.render('/');
					})
					.catch(Sequelize.ValidationError, function(error){
						console.log("Errores de validación:", error);
						for (var i in error.errors) {
							console.log('Error en el campo:', error.errors[i].value);
						};
					})
					.catch(function(){
						console.log("Error:", error);
					});
			}
		})
		.catch(function(error){
			console.log('Error:', error);
		});
	}
};

/********************************************************************/
/********************************************************************/





