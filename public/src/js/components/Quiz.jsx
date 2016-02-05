var QuizActions = require('../actions/QuizActions');

var Quiz = React.createClass({
	addQuestionClick: function(){
		QuizActions.add_Quiz(this.questionInput.value, this.answerInput.value);
	},
	updateQuestionClick: function(){
		QuizActions.update_Quiz(this.props.id, this.questionInput.value, this.answerInput.value);
	},
	render: function(){

		if(this.props.id >= 0){

			return (
				<form>
					<div id="pregunta_quiz" >
						<label> Pregunta: </label>
						<input id="pregunta" placeholder={this.props.pregunta} ref={(ref) => this.questionInput = ref} /> 
					</div>

					<div id="respuesta_quiz" >
						<label> Respuesta: </label>
						<input id="answer" placeholder={this.props.respuesta} ref={(ref) => this.answerInput = ref} /> 
					</div>

					<button id="botonAddQuiz" type="reset" onClick={this.updateQuestionClick} > Update Quiz </button>
				</form>
			)

		} else {

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

					<button id="botonAddQuiz" type="reset" onClick={this.addQuestionClick} > Crear Quiz </button>
				</form>
			)
			
		}
	}
});

module.exports = Quiz;