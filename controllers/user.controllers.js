const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = "1", limit } = req.query;

    res.json({
        msg: 'get API - controllers',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuariosPut = (req, res = response) => {

    const { id } = req.params;
    
    res.json({
        msg: 'put API - controllers',
        id
    });
};

const usuariosPost = async(req, res = response) => {

    //Revisa si express-validators ha recinido algún error en us verificacion
    const errors = validationResult(req);
    
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    //Destructuracion del body (parametros colocados en models/user.js)
    const { nombre, email, password, role }  = req.body;
    //
    const user = new User( { nombre, password, email, role } );

    // Verificar si el correo existe 
    const existeEmail = await User.findOne({ email });
    if(existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado.'
        });
    }

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar info en DB
    await user.save();

    res.json({
        msg: 'post API - controllers',
        user
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controllers'
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controllers'
    });
};


module.exports = { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
 };