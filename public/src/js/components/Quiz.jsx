var QuizActions = require('../actions/QuizActions');

var Quiz = React.createClass({
	addQuestionClick: function(){
		QuizActions.add_Quiz(this.questionInput.value, this.answerInput.value);
	},
	render: function(){

		return (
			<form>
				<div id="pregunta_quiz" >
					<label> Pregunta: </label>
					<input id="pregunta" placeholder="Pregunta" ref={(ref) => this.questionInput = ref} />
				</div>

				<div id="respuesta_quiz" >
					<label> Respuesta: </label>
					<input id="answer" placeholder="Respuesta" ref={(ref) => this.answerInput = ref} />
				</div>

				<button id="botonAddQuiz" type="reset" onClick={this.addQuestionClick}> Añadir Quiz </button>
			</form>
		)
	}
});

module.exports = Quiz;