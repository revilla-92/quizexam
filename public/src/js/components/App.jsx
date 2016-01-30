const Quiz = require('./Quiz.jsx');
const Exam = require('./Exam.jsx');
const Cabecera = require('./Cabecera.jsx');

var QuizActions = require('../actions/QuizActions');
var QuizStore = require('../stores/QuizStores');


function getAppStateFromStore() {
	return {
		tableIsVisible: QuizStore.getTableIsVisible(), 
		numQuizes: 		QuizStore.getNumberOfQuizes(),
		quizExam: 		QuizStore.getQuizExam()
	};
}

var App = React.createClass({
	getInitialState: function(){
		return getAppStateFromStore();
	},
	componentDidMount() {
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
				<Quiz />
				<Exam quizExam={this.state.quizExam} tableIsVisible={this.state.tableIsVisible} />
			</div>
		)
	}
});

module.exports = App;