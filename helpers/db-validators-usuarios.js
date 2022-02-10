// const Rol = require('../models/rol');
// const Usuario = require('../models/usuarioprueba');

import Rol from '../models/rol.js';
import Usuario from '../models/usuario.js';


const existeEmail = () => {
    return async (req, res, next) => {
        const existe = await Usuario.findOne({  email: req.body.email } );  
        if (req.method === 'PUT') {
            if (existe && existe._id != req.params.id ) {
                return res.status(401).json({ msg: `El email ya está registrado` });
            }
        }else{
            if (existe  ) {
                return res.status(401).json({ msg: `El email ya está registrado` });
            }
        }
        next();
    }
}


const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {

        throw new Error(`El id no existe ${id}`);
    }
}



export {
    existeEmail,
    existeUsuarioPorId
}
