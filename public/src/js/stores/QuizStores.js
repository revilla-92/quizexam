const EventEmitter = require('events').EventEmitter;

var QuizDispatcher = require('../dispatchers/QuizDispatcher');
var Constants = require('../constants/QuizConstants');

// Variable para manejar las propiedades de la Cabecera.
var numberOfQuizes = 0;

// Variable para manejar las preguntas y respuestas.
var quizExam = [[]];

// Variables para la edicion de quizes
var id;
var pregunta = "";
var respuesta = "";

/**
 * Funcion auxiliar para añadir la pregunta y respuesta al quiz.
 * Para ello pasamos como atributos (parametros) el texto de la 
 * pregunta y de la respuesta y el numero de la pregunta.
 */
function create(question, answer) {
	quizExam.push([0, question, answer]);
}

var QuizStore = Object.assign({}, EventEmitter.prototype, {
	getNumberOfQuizes: function () {
		return numberOfQuizes;
	},
	getQuizExam: function () {
		return quizExam;
	},
	getID: function () {
		return id;
	},
	getPregunta: function () {
		return pregunta;
	},
	getRespuesta: function () {
		return respuesta;
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

			// Actualizamos el numero de preguntas y reseteamos los inputs.
			numberOfQuizes = numberOfQuizes + 1;

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

			// Eliminamos el elemento seleccionado.
			quizExam.splice(payload.id.target.id -1, 1);

			// Actualizamos el numero de preguntas.
			numberOfQuizes = numberOfQuizes - 1;

			// Emitimos el cambio y paramos el switch case.
			QuizStore.emitChange();
			break;


		case Constants.ActionTypes.EDIT_QUIZ:

			// Cogemos la pregunta y la respuesta a editar.
			id = payload.id.target.id - 1;
			pregunta = quizExam[payload.id.target.id - 1][1];
			respuesta = quizExam[payload.id.target.id - 1][2];

			// Emitimos el cambio y paramos el switch case.
			QuizStore.emitChange();
			break;


		case Constants.ActionTypes.UPDATE_QUIZ:

			// Actualizamos los valores.
			quizExam[payload.id][1] = payload.question;
			quizExam[payload.id][2] = payload.answer;

			// Poniendo la id a -1 se vuelve a poner el boton de añadir pregunta.
			id = -1;

			// Emitimos el cambio y paramos el switch case.
			QuizStore.emitChange();
			break;


		case Constants.ActionTypes.LOAD_DB:

			// Cambiamos el numero de quizes al de las preguntas en la BBDD.
			numberOfQuizes = payload.data.length;

			// Borramos las preguntas anteriores.
			quizExam = [[]];

			// Eliminamos el primer elemento del array ya que no tiene longitud.
			if(quizExam[0].length === 0){
				quizExam.shift();
			}

			// Cargamos el array de la BBDD.
			quizExam = payload.data;

			// Emitimos el cambio y paramos el switch case.
			QuizStore.emitChange();
			break;
	}
});

module.exports = QuizStore;