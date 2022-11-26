const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user')

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    // const usuarios = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await User.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        //msg: 'Información obtenida',
        total,
        usuarios
    });
};

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //Calidar en base de datos
    if(password){
        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await User.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'Información actualizada',
        usuario
    });
};

const usuariosPost = async(req, res = response) => {

    //Destructuracion del body (parametros colocados en models/user.js)
    const { name, email, password, role }  = req.body;
    //
    const user = new User( { name, password, email, role } );

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar info en DB
    await user.save();

    res.json({
        msg: 'User added',
        user
    });
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;

    const usuario = await User.findByIdAndUpdate( id, { status: false } );
    const usuarioAutenticado = req.user;

    res.json({
        msg: 'Usuario eliminado',
        usuario,
        //uid,
        //usuarioAutenticado
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