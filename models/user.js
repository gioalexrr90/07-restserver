const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre  es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El correo  es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña  es obligatorio']
    },

    image: {
        type: String,
    },

    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    status: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },
});

//Esta funcioncion permite liminar del resultado el __v y password como respuesta en el res, enviando solo "usuario" que son los datos restantes 
userSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', userSchema );