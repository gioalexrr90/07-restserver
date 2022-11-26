const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/JWT');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - correo'
            })
        }

        // Validar si el usuario esta activo
        if( !user.status ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - status: false'
            })
        }

        // Verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, user.password);
        if( !validarPassword ){
            return res.status(400).json({
                msg: 'Usuario o contraseña no son correctos - password'
            })
        }

        // General JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}