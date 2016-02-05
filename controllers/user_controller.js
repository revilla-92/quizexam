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


/* Formulario para crear un usuario (GET): 
 *
 * Renderiza la vista del formulario para crear un usuario.
 */
exports.show = function(req, res, next) {
	res.render('users/new');
};


/* Formulario para crear un usuario (POST): 
 *
 * Con este metodo creamos en la BBDD un nuevo usuario a partir de los datos recogidos en el formulario.
 * Se comprueba que no exista ningun usuario con el mismo login así como que se han introducido todos los campos.
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
						res.redirect('/');
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


/* Vista con tabla de usuarios (GET):
 *
 * Enseñamos todos los usuarios registrados en el sistema.
 */
exports.index = function (req, res, next) {

	models.User.findAll({order: ['login']})
	.then(function(users){
		res.render('users/index', {
			users: users
		});
	})
	.catch(function(error){
		console.log("Error:", error)
	});
};


/* Eliminar un usuario (POST):
 *
 * Para ello debemos de ser admin (se comprueba en sessionController.isAdmin). Y simplemente recogemos la ID del 
 * usuario a eliminar y lo eliminamos de la BBDD. 
 */
 exports.destroy = function (req, res, next) {

 	// Buscamos el usuario cuya ID es la pasada como parametro, si es encontrado lo eliminamos y sino mandamos error.
	models.User.find({where: {id: req.params.userid}})
	.then(function(userParaEliminar){

		// Lo eliminamos si tiene exito volvemos a renderizar la vista de los usuarios y sino lanzamos un error.
		userParaEliminar.destroy()
		.then(function (){

			console.log('Usuario elminado con exito.');

			// Si es el admin logeado redireccionamos a la vista con los usuarios pasando todos los usuarios 
			// Si se produce error al buscar los usuarios lo capturamos.
			// Si no somos el admin (else) borramos nuestra cuenta por tanto destruimos la sesion y redirigimos a home.
			if(req.session.user.isAdmin){
				models.User.findAll({order: ['login']})
				.then(function(users){
					res.render('users/index', {
						users: users
					});
				})
				.catch(function(error){
					console.log("Error:", error)
				});
			} else {
				delete req.session.user;
				res.redirect('/');
			}
		})
		.catch(function(error){
			console.log("Error:", error);
		});
	})
	.catch(function(error){
		console.log("Error:", error);
	});

 }


/* Editar un usuario (GET):
 *
 * Para mostrar la vista de la ediccion debemos de buscar el usuario que queremos editar y pasarlo a la vista.
 */
 exports.edit = function (req, res, next) {

 	// Buscamos el usuario a editar en la base de datos y sino lo encuentra capturamos el error.
	models.User.find({where: {id: req.params.userid}})
	.then(function(userEdit){

		res.render('users/edit', {
			userEdit: userEdit
		});

	})
	.catch(function(error){
		console.log("Error:", error);
	});

 }


 /* Actualizar un usuario (POST):
 *
 * Para mostrar la vista de la ediccion debemos de buscar el usuario que queremos editar y pasarlo a la vista.
 */
 exports.update = function (req, res, next) {

 	// Si algun campo esta vacio sacamos un error y sino actualizamos el usuario con los datos pasados.
	if ( isEmpty(req.body.login) || isEmpty(req.body.password) || isEmpty(req.body.email) ) {
		console.log('No se ha introducido todos los campos, que son obligatorios.');
		req.flash('error', 'Todos los campos son obligatorios.');
		models.User.find({where: {id: req.params.userid}})
		.then(function(userEdit){
			res.render('users/edit', {
				userEdit: userEdit
			});
		})
		.catch(function(error){
			console.log("Error:", error);
		});
		return;

	// Actualizamos el usuario.
	}else{

		models.User.find({where: {id: req.params.userid}})
		.then(function(userParaEliminar){
			userParaEliminar.destroy()
			.then(function(){
				console.log("Usuario en proceso de actualizarse");
			})
			.catch(function(error){
				console.log(error);
			});
		})
		.catch(function(error){
			console.log("Error:", error);
		});

		var user = models.User.build({
			login: req.body.login,
			email: req.body.email,
			password: req.body.password,
			isAdmin: req.session.user.isAdmin
        });

        // Si no hay errores y el usuario no existe entonces lo guardamos.
		user.save()
		.then(function(user){

			console.log('Usuario: ' + user.login + ' actualizado con éxito.');
			req.flash('success', 'Usuario: ' + user.login + ' actualizado con éxito.');

			// Tiempo maximo que puede estar la sesion establecida.
            var maxTime = new Date().getTime() + 30000;

            // IMPORTANTE: creo req.session.user. Solo guardo algunos campos del usuario en la sesion.
            req.session.user = {id:user.id, login:user.login, expiration:maxTime, isAdmin:user.isAdmin};

			res.redirect('/');
		})
		.catch(function(){
			console.log("Error:", error);
		});
	} 	
}

/********************************************************************/
/********************************************************************/





