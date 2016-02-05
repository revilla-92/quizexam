import {Table, Column, Cell} from 'fixed-data-table';

var QuizActions = require('../actions/QuizActions');

var Exam = React.createClass({

	deleteQuestionClick: function(id){
		QuizActions.delete_Quiz(id);
	},
	editQuestionClick: function(id){
		QuizActions.edit_Quiz(id);
	},
	render: function(){

		// Recogemos el array de dos dimensiones que contiene las preguntas y las respuestas.
		var rows = this.props.quizExam;

		if(this.props.numQuizes != 0){

			return (
				<div>
					<Table id="tabla_Quiz" rowHeight={50} rowsCount={rows.length} width={1180} height={600} headerHeight={50}>
					    <Column
					    	header={<Cell> Pregunta </Cell>}
					    	cell={({rowIndex}) => (
					    		<Cell>
					    			{rows[rowIndex][1]}
					    		</Cell>
					    	)}
					    	width={500}
					    />
					    <Column
					    	header={<Cell> Respuesta </Cell>}
					    	cell={({rowIndex}) => (
					    		<Cell>
					    			{rows[rowIndex][2]}
					    		</Cell>
					    	)}
					    	width={500}
					    />
					    <Column
					    	header={<Cell> Eliminar </Cell>}
					    	cell={({rowIndex}) => (
					    		<Cell>
					    			<button id={rowIndex + 1} onClick={this.deleteQuestionClick}> Eliminar Quiz </button>
					    		</Cell>
					    	)}
					    	width={100}
					    />
					    <Column
					    	header={<Cell> Editar </Cell>}
					    	cell={({rowIndex}) => (
					    		<Cell>
					    			<button id={rowIndex + 1} onClick={this.editQuestionClick}> Editar Quiz </button>
					    		</Cell>
					    	)}
					    	width={80}
					    />
					</Table>

					<form id='formUploadQuizes' method='POST' action='/quizes/new'>

						<input type="hidden" name="quizes" value={this.props.quizExam} />

						<input type="hidden" name="numQuizes" value={this.props.numQuizes} />

						<input name="commit" type="submit" value="Añadir Quizes" />

					</form>
				</div>
			)

		}else {
			return (
				<p id="noQuiz" > Aun no hay quizes creados. </p>
			)
		}
		
	}
});


module.exports = Exam;