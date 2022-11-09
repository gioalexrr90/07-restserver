const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    //Revisa si express-validators ha recinido algún error en us verificacion
    const errors = validationResult(req);
    
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    //En caso de no encontrar errores por express-validation, la función next se encarga de seguir con el codigo o siguiente interacción
    next();

}

module.exports = {
    validarCampos
}