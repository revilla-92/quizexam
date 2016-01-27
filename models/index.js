// Cargamos los modulos que necesitamos.
var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
	{
		dialect:  "sqlite",
		storage:  "quizexam.sqlite",
	}      
);

// Importamos la(s) definiciones de las BBDD (clases)
var User = sequelize.import(path.join(__dirname,'user'));


// Exportamos las clases de los distintos modelos.
exports.User = User;

// Crear las tablas en la base de datos que no se hayan creado aun. En un futuro lo haremos con migraciones.
sequelize.sync().then(function(){

	// Si se cumple la promesa de que se sincroniza la tabla entonces.
	User.count().then(function (count){

		// La tabla se inicializa solo si está vacía.
		if(count === 0) {

			// Creamos dos usuarios por defecto.
	    	User.bulkCreate( 
	    		[
	    			{username: 'admin', email: 'admin@admin.com', password: '1234', isAdmin: true},
	    			{username: 'user', email: 'user@user.com', password: '1234'}
	    		]
	    	).then(function(){
	    		console.log("Base de Datos de Usuarios: Inicializada.");
	    	});
		};
	});
});