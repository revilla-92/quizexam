var models = require('../models');

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
				respuesta: respuestas[j]
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

/*******************************************************************/
/*******************************************************************/



