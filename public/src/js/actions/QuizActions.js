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
	},
	edit_Quiz: function(id) {
		QuizDispatcher.dispatch({
			type : Constants.ActionTypes.EDIT_QUIZ, 
			id : id
		});
	},
	update_Quiz: function(id, question, answer) {
		QuizDispatcher.dispatch({
			type : Constants.ActionTypes.UPDATE_QUIZ, 
			id : id,
			question : question,
			answer : answer
		});
	},
	load_DB: function(data) {
		QuizDispatcher.dispatch({
			type : Constants.ActionTypes.LOAD_DB,
			data : data
		});
	},
};