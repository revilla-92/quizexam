// Definicion de la clase Quiz:

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User',
    { 
        pregunta: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: "El campo login no puede estar vacío" }
            }
        },
        respuesta: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: "El campo login no puede estar vacío" }
            }
        }   
    });
}