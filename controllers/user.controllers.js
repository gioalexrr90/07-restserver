const { response, request } = require('express');

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

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controllers',
        nombre,
        edad
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