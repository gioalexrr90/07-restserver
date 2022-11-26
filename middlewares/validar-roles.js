const { response } = require("express")


const esAdminRole = (req, res = response, next) => {

    if ( !req.user ){
        return res.status(500).json({
            msg: 'varificar role sin validar token'
        });
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ name } no es un administrador - No puede hacer esto`
        })
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if ( !req.user ){
            return res.status(500).json({
                msg: 'varificar role sin validar token'
            });
        }

        if( !roles.includes( req.user.role ) ){
            return res.status(401).json({
                msg: `Se reqioere alguno de los siguientes roles ${ roles }`
            })
        } 
        
        next();
    }

}

module.exports = {
    esAdminRole, 
    tieneRole
}