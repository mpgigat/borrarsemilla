// const Rol = require('../models/rol');
// const Persona = require('../models/Personaprueba');

import Rol from '../models/rol.js';
import Persona from '../models/persona.js';

const emailExiste = async (email = '') => {
    // Verificar si el email existe
    const existeEmail = await Persona.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email: ${email}, ya está registrado`);
    }
}

const existePersonaPorId = async (id) => {

    const existePersona = await Persona.findById(id);
    if (!existePersona) {

        throw new Error(`El id no existe ${id}`);
    }
}



export {
    emailExiste,
    existePersonaPorId
}
