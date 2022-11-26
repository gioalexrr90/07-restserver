const { response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const User = require('../models/user');

const validarJWT = async( req, res = response, next ) => {

    // Leer los headers
    const token = req.header( 'Autorization' );
    
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid }   = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if( !user ) {
            return res.status(401).json({
                msg: 'Token no valido - user no existente en DB'
            });
        }

        // Verificar si el uid tiene status true
        if( !user.status ){
            return res.status(401).json({
                msg: 'Token no valido - user status false'
            });
        }

        req.user = user;

        next();
        
    } catch (error) {
        //console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}