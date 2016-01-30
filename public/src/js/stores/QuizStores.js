const EventEmitter = require('events').EventEmitter;

var QuizDispatcher = require('../dispatchers/QuizDispatcher');
var Constants = require('../constants/QuizConstants');

// Variable para manejar las propiedades de la Cabecera.
var numberOfQuizes = 0;

// Habilitamos la vista de la tabla cuando se cree el primer elemento.
var tableIsVisible = false;

// Variable para manejar las preguntas y respuestas.
var quizExam = [[]];


/**
 * Funcion auxiliar para añadir la pregunta y respuesta al quiz.
 * Para ello pasamos como atributos (parametros) el texto de la pregunta y de la respuesta y el numero de la pregunta.
 */
function create(question, answer) {
	quizExam.push([question, answer]);
}


var QuizStore = Object.assign({}, EventEmitter.prototype, {

	getNumberOfQuizes: function () {
		return numberOfQuizes;
	},
	getQuizExam: function () {
		return quizExam;
	},
	getTableIsVisible: function () {
		return tableIsVisible;
	},
	addChangeListener(callback) {
		this.on(Constants.CHANGE_EVENT, callback);
	},
	removeChangeListener(callback) {
		this.removeListener(Constants.CHANGE_EVENT, callback);
	},
	emitChange() {
		this.emit(Constants.CHANGE_EVENT);
	}
});


QuizDispatcher.register(function (payload) {

	switch (payload.type) {

		case Constants.ActionTypes.ADD_QUIZ:

			// Traza para ver que entramos en el caso de crear.
			console.log("CREAR");

			// Actualizamos el numero de preguntas y reseteamos los inputs.
			numberOfQuizes = numberOfQuizes + 1;

			// Hacemos visible la tabla.
			tableIsVisible = true;

			// Añadimos la pregunta y la respuesta al quizesay.
			create(payload.question, payload.answer);

			// Eliminamos el primer elemento del array ya que no tiene longitud.
			if(quizExam[0].length === 0){
				quizExam.shift();
			}

			// Emitimos el cambio y paramos el switch case.
			QuizStore.emitChange();
			break;


		case Constants.ActionTypes.DELETE_QUIZ:

			// Traza para ver que entramos en el caso de eliminar.
			console.log("ELIMINAR");

			// Eliminamos el elemento seleccionado.
			quizExam.splice(payload.id.target.id -1, 1);

			// Si ya no quedan mas preguntas, ocultamos la tabla.
			if(quizExam.length === 0){
				tableIsVisible = false;
			}

			// Actualizamos el numero de preguntas.
			numberOfQuizes = numberOfQuizes - 1;

			QuizStore.emitChange();
			break;
	}
});

module.exports = QuizStore;