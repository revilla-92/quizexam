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
 * Con este metodo renderizamos la vista hecho con Flux para crear Quizes.
 */
exports.show = function(req, res, next) {
	res.render('quizes/new');
};


/* 
 * Con este metodo renderizamos la vista con todos los Quizes creados hasta el momento.
 */
exports.index = function(req, res, next) {

	models.Quiz.findAll()
	.then(function(quizes){
		res.render('quizes/index', {
			quizes: quizes
		});
	})
	.catch(function(error){
		console.log("Error:", error)
	});
}

/* 
 * Carga BBDD en la aplicacion de Flux.
 */
exports.loadQuizesToFlux = function(req, res, next) {

	models.Quiz.findAll()
	.map(function(quiz){
		return [quiz.id, quiz.pregunta, quiz.respuesta];
	})
	.then(function(quizes){
		console.log(quizes);
		res.send(quizes);
	})
	.catch(function(error){
		console.log("Error:", error);
		res.send([]);		
	});
}


/* 
 * Creacion de los Quizes guardandolos en la BBDD.
 */
exports.create = function(req, res, next){

	// Reocgemos el numero de quizes y los quizes en si.
	var quizes = req.body.quizes;
	var numQuizes = req.body.numQuizes;

	// Creamos los arrays donde almacenaremos por separados las preguntas y las respuestas.
	var ids = new Array(numQuizes);
	var preguntas = new Array(numQuizes);
	var respuestas = new Array(numQuizes);


	// Separamos quizes en un array de tal forma que las pares son preguntas y las impares respuestas.
	var quizesArray = quizes.split(",");

	// Variable para recorrer los indices del array preguntas y respuestas.
	var n = 0;

	// Creamos a partir del array anterior en otro array que son por separado preguntas y respuestas.
	for (i = 0; i < 3 * numQuizes; i = i + 3){
		ids[n] = quizesArray[i]
		preguntas[n] = quizesArray[i+1];
		respuestas[n] = quizesArray[i+2];
		n++;
	}

	// Ahora vamos recorriendo ambos arrays e introduciendo dichos datos en la BBDD.
	for (j = 0; j < numQuizes; j++){

		if(ids[j] === '0'){
			var quiz = models.Quiz.build({
				pregunta: preguntas[j],
				respuesta: respuestas[j],
				UserId: req.session.user.id
	        });
			quiz.save()
			.then(function(quiz){
				console.log('Quiz creado con exito. Pregunta: ' +quiz.pregunta+ ' y la Respuesta: ' +quiz.respuesta+ ' creado con exito.');
			})
			.catch(function(error){
				console.log('Error:', error);
			});
		}
	}
	res.redirect('/quizes');
}


/* Eliminar un Quiz (POST):
 *
 * Eliminamos el Quiz.
 */
exports.destroy = function(req, res, next){
	console.log(req.params.quizid);

	models.Quiz.find({where: {id: req.params.quizid}})
	.then(function(quizParaEliminar){

		// Eliminamos el quiz.
		quizParaEliminar.destroy()
		.then(function(){

			console.log("Quiz eliminado con exito.");

			// Volvemos a cargar los Quizes y los mostramos.
			models.Quiz.findAll()
			.then(function(quizes){
				res.render('quizes/index', {
					quizes: quizes
				});
			})
			.catch(function(error){
				console.log("Error:", error)
			});
		})
		.catch(function(error){
			console.log(error);
		});
	})
	.catch(function(error){
		console.log(error);
	});
}


/* Editar un Quiz (GET):
 *
 * Para mostrar la vista de la ediccion debemos de buscar el quiz que queremos editar y pasarlo a la vista.
 */
exports.edit = function (req, res, next) {

 	console.log("ENTRO EN EDIT");

 	// Buscamos el usuario a editar en la base de datos y sino lo encuentra capturamos el error.
	models.Quiz.find({where: {id: req.params.quizid}})
	.then(function(quizEdit){

		res.render('quizes/edit', {
			quizEdit: quizEdit
		});

	})
	.catch(function(error){
		console.log("Error:", error);
	});

}


/* Actualiza un Quiz (POST):
 *
 * Actualiza los valores de un Quiz.
 */
exports.update = function (req, res, next) {

	if(isEmpty(req.body.pregunta) || isEmpty(req.body.respuesta)){

		console.log('Se han dejado campos vacíos.');

		req.flash('error', 'Todos los campos deben ser rellenados.');

		models.Quiz.find({where: {id: req.params.quizid}})
		.then(function(quizEdit){
			res.render('quizes/edit', {
				quizEdit: quizEdit
			});
		})
		.catch(function(error){
			console.log("Error:", error);
		});

		return;

	} else {

		models.Quiz.find({where: {id: req.params.quizid}})
		.then(function(quizParaEliminar){
			quizParaEliminar.destroy()
			.then(function(){
				console.log("Quiz en proceso de actualizarse");
			})
			.catch(function(error){
				console.log(error);
			});
		})
		.catch(function(error){
			console.log("Error:", error);
		});

		var quiz = models.Quiz.build({
			pregunta: req.body.pregunta,
			respuesta: req.body.respuesta,
			UserId: req.session.user.id
        });

        // Si no hay errores y el usuario no existe entonces lo guardamos.
		quiz.save()
		.then(function(user){

			models.Quiz.findAll()
			.then(function(quizes){
				console.log('Quiz actualizado con éxito.');
				req.flash('success', 'Quiz actualizado con éxito.');
				res.redirect('/');
			})
			.catch(function(error){
				console.log("Error:", error)
			});
		})
		.catch(function(){
			console.log("Error:", error);
		});
	}
}


/*******************************************************************/
/*******************************************************************/



