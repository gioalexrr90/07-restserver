const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/JWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, image, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        //Si el usuario no exist, entonces crea un nuevo usuario
        if ( !user ) {
            // crear usuario
            const data = {
                name,
                email,
                password: 'tuCola',
                image,
                google: true,
                role: DefaultTransporter
            };

            user = new User( data );
            await user.save();
        }

        // Si el status del usuario es false
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Hable con el admistrador, usuario bloqueado'
            });
        }

        // General JWT
        const token = await generarJWT(user.id);
        
        res.json({
            user,
            token
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
        
    }

}

module.exports = {
    login,
    googleSingIn
}