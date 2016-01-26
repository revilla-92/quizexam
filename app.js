// Modulos de NPM instalados, y que requerimos en la aplicacion.
var bodyParser = require('body-parser');
var connect = require('connect');
var cookieParser = require('cookie-parser');
var express = require('express');
var flash = require('express-flash');
var partials = require('express-partials');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var favicon = require('static-favicon');

// Necesitaremos el enrutador de las vistas.
var routes = require('./routes/index');

// Creamos la aplicacion con Express.
var app = express();

// Indicamos que el motor de las vistas va a ser .ejs y que se encontrara en el directorio views.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Indicamos en nuestra aplicacion vamos a usar express-partials y flash para los mensajes de error.
app.use(partials());
app.use(flash());

// Indicamos el icono de la aplicacion dentro de la carpeta public.
app.use(favicon(__dirname + '/public/favicon.ico'));

// Indicamos los middleware que vamos a emplear.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz Exam'));
app.use(session());
app.use(methodOverride('_method'));

// Indicamos que todos los ficheros estaticos van a encontrarse en la carpeta public.
app.use(express.static(path.join(__dirname, 'public')));

// Indicamos la página por defecto que se mostrara al arrancar la aplicacion.
app.use('/', routes);

// Helper estatico:
app.locals.escapeText =  function(text) {
	return String(text)
    	.replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br>');
};

// Captura el error 404 (not found) y lo envia al manejador de errores.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/******************************* Error handlers ***********************************/

// Development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Finalmente exportamos la aplicacion.
module.exports = app;




