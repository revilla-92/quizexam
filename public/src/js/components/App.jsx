const Quiz = require('./Quiz.jsx');
const Exam = require('./Exam.jsx');
const Cabecera = require('./Cabecera.jsx');

var QuizActions = require('../actions/QuizActions');
var QuizStore = require('../stores/QuizStores');

function getAppStateFromStore() {
	return {
		id: 			QuizStore.getID(),
		pregunta: 		QuizStore.getPregunta(),
		respuesta: 		QuizStore.getRespuesta(),
		numQuizes: 		QuizStore.getNumberOfQuizes(),
		quizExam: 		QuizStore.getQuizExam()
	};
}

var App = React.createClass({
	loadQuizesFromServer: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	loadDB: function () {
		this.loadQuizesFromServer();
		QuizActions.load_DB(this.state.data);
	},
	getInitialState: function(){
		return getAppStateFromStore();
	},
	componentDidMount() {
		this.loadQuizesFromServer();
		QuizStore.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		QuizStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getAppStateFromStore());
	},
	render: function(){

		return (
			<div>
				<Cabecera numQuizes={this.state.numQuizes} />
				<Quiz id={this.state.id} pregunta={this.state.pregunta} respuesta={this.state.respuesta} />
				<button id="loadDB" type="submit" onClick={this.loadDB} > Cargar BBDD </button>
				<Exam quizExam={this.state.quizExam} numQuizes={this.state.numQuizes} />
			</div>
		)
	}
});

module.exports = App;