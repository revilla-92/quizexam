// Definicion de la clase User:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User',
      { login: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: "El campo login no puede estar vacío" }
            }
        },
        email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: { msg: "El formato del email introducido no es correcto" },
                notEmpty: { msg: "El campo email no puede estar vacío" }
            }
        },
        password: {
            type: DataTypes.STRING
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
        
    });
}