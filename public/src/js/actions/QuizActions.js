var QuizDispatcher = require('../dispatchers/QuizDispatcher');
var Constants = require('../constants/QuizConstants');

module.exports = {
	add_Quiz: function(question, answer) {
		QuizDispatcher.dispatch({
			type : Constants.ActionTypes.ADD_QUIZ, 
			question :question,
			answer :answer
		});
	},
	delete_Quiz: function(id) {
		QuizDispatcher.dispatch({
			type : Constants.ActionTypes.DELETE_QUIZ, 
			id : id
		});
	}
};