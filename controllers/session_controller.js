// Requerimos el modelo de los usuarios para la autenticacion.
var models = require('../models');


/*********************** Funciones Auxiliares ***********************/
/********************************************************************/

function isEmpty(value){
    return (value == null || value.length === 0);
}

/********************************************************************/
/********************************************************************/


/****************************** Rutas ******************************/
/*******************************************************************/

/* Formulario para hacer login (GET): 
 *
 * Renderiza la vista del formulario para hacer login.
 */
exports.new = function(req, res) {
    res.render('session/new');
};


/* Middleware Create (POST): 
 *
 * Recoge los parametros del formulario para hacer login y los comprueba con la BBDD de los usuarios.
 * Si el usuario no existe o bien se ha introducido erroneamente la contraseña se notifica el error.
 * Si pasa ambas comprobaciones se logea correctamente y se crea la sesion (req.session.user).
 */
exports.create = function(req, res){

    // Comprobamos que primero se hayan introducido los parametros.
    if ( isEmpty(req.body.login) || isEmpty(req.body.password) ){
        console.log('No se ha rellenado todos los campos, que son obligatorios.');
        req.flash('error', 'Rellene todos los campos.');
        res.render('session/new');

    } else {

        // Recogemos el login y la password.
        var login     = req.body.login;
        var password  = req.body.password;

        // Buscamos en la BBDD si existe el usuario para autenticarlo como tal.
        models.User.findOne({where: {login: login}})
        .then(function(user) { 

            // Si ha encontrado el usario, comprobamos si la contraseña de la BBDD y la recogida coinciden.
            if (user) {

                if(user.password === password){
                    console.log('Se ha logeado correctamente');

                    // Tiempo maximo que puede estar la sesion establecida.
                    var maxTime = new Date().getTime() + 30000;

                    // IMPORTANTE: creo req.session.user. Solo guardo algunos campos del usuario en la sesion.
                    req.session.user = {id:user.id, login:user.login, expiration:maxTime, isAdmin:user.isAdmin};

                    // Redirecciono a la pagina principal.
                    res.redirect('/');

                // Si la contraseña no coinciden lanzamos un error.       
                }else{
                    req.flash('error', 'La contraseña es incorrecta, por favor pruebe de nuevo.');
                    res.render('session/new');
                    return;
                }

            // El usuario no existe 
            } else {
                req.flash('error', 'No existe el usuario con login: ' + login + '.');
                res.render('session/new');
                return;
            }
        })
        .catch(function(error) {
            console.log("Error:", error);
            return;
        });
    }
}


/* Middleware Destroy (GET):
 * 
 * Destruye la sesion actual dando un mensaje de que se ha realizado correctamente.
 */
exports.destroy = function(req, res, next){
    delete req.session.user;
    req.flash('success', 'Se ha deslogeado correctamente.');
    res.redirect("/"); 
}


/*******************************************************************/
/*******************************************************************/


/************************** Middlewares ****************************/
/*******************************************************************/


/* Middleware: Se requiere hacer login:
 *
 * Si el usuario ya hizo login anteriormente entonces existira  el objeto user en req.session, 
 * por lo que continuo con los demas middlewares o rutas.
 * Si no existe req.session.user, entonces es que aun no he hecho login, por lo que me redireccionan a una pantalla de login. 
 */
exports.loginRequired = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash('error', 'Debe de estar logeado para acceder a ese contenido.');
        res.redirect('/');
    }
};


/* Middleware: Se requiere ser admin:
 *
 * Se comprueba que el usuario en cuestion es el administrados para poder realizar unas determinadas acciones.
 */
exports.isAdmin = function (req, res, next) {
    if (req.session.user.isAdmin){
        next();
    } else {
        req.flash('error', 'Debe de ser Administrados para realizar dicha acción.');
        res.redirect('/');
    }
}


/* Middleware Autologout:
 * 
 * Actualiza el tiempo de expiración de la sesión cada vez que se carga una página.
 */
exports.autologout = function (req, res, next) {

    console.log("Entramos en el autologout");

    if (req.session.user) {

        var actualMoment = new Date().getTime();

        if(actualMoment < req.session.user.expiration){
            req.session.user.expiration = new Date().getTime()+3000000;
            console.log("Cuanta reiniciada");
            next(); 
        }else{
            delete req.session.user;
            req.flash('error', 'Su sesion ha expirado');
            console.log("Sesion caducada");
            res.redirect("/login");
            next();
        }
    }else{
        next();
        console.log("Usuario no conectado");
    }
};


/*******************************************************************/
/*******************************************************************/



