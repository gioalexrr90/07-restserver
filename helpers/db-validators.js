const Role = require('../models/role');
const User = require('../models/user');

//comprueba si el valor guardado en role existe en la base de datos
const valRole = async( role = '' ) => {
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const valExistEmail = async(email = '' ) => {
    // Verificar si el correo existe 
    const existeEmail = await User.findOne({ email });
    if(existeEmail){
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const valUserByID= async(id) => {
    // Verificar si el usuario existe por el id de MongoDB
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
    }
}

module.exports = {
    valRole,
    valExistEmail,
    valUserByID
}