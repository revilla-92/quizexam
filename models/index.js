/*
// Cargamos los modulos que necesitamos.
var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Usar BBDD SQLite:
var sequelize = new Sequelize(DB_name, user, pwd, 
	{
		dialect:  protocol,
		protocol: protocol,
		port:     port,
		host:     host,
		storage:  storage,  // solo SQLite (.env)
		omitNull: true      // solo Postgres
	}      
);

*/