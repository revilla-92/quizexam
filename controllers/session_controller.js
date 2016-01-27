// Requerimos el modelo de los usuarios para la autenticacion.
var models = require('../models');


/*********************** Funciones Auxiliares ***********************/
/********************************************************************/

function isEmpty(value){
    return (value == null || value.length === 0);
}

/********************************************************************/
/********************************************************************/


/* Formulario para hacer login: 
 *
 * Renderiza la vista del formulario para hacer login.
 */
exports.new = function(req, res) {
    res.render('session/new');
};


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
                    req.session.user = {id:user.id, login:user.login, expiration:maxTime, userLogged:true};

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



