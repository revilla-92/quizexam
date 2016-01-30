var Cabecera = React.createClass({
	render: function(){
		
		if(this.props.numQuizes === 0){
			return (
				<p> </p>
			)
		}else{
			return(
				<p id="numberQuiz"> Numero de preguntas realizadas: {this.props.numQuizes} </p>
			)
			
		}
	}
});

module.exports = Cabecera;