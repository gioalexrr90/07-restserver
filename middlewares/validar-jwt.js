const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // Leer los headers
    const token = req.header( 'Autorization' );
    
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid }   = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}