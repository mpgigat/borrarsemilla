import Categoria from '../models/categoria.js';
import Articulo from '../models/articulo.js';


const existeArticuloById = async( id ) => {
    const existe = await Articulo.findById(id);
    if ( !existe ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeArticuloByIdBoolean = async( id ) => {

    const existe= await Articulo.findById(id);
    if(existe) return true
    else return false
    
}

const existeArticuloByNombre= async( articulo = '' ) => {
    // Verificar si el correo existe
    const existe= await Articulo.findOne({ nombre:articulo });    
    if ( existe ) {
        throw new Error(`El articulo: ${ articulo }, ya está registrado`);
    }
}

const existeArticuloByNombreAndId= async( articulo = '',nombre ) => {
    // Verificar si el correo existe    
    for (const property in nombre) {
        console.log(`${property}: ${object[property]}`);
      }
    const existe= await Articulo.findOne({ nombre:articulo});
    
    if ( existe && existe._id!==id ) {

        throw new Error(`El articulo: ${ articulo }, ya está registrado!`);
    }
}

const existeArticuloByCodigo= async( articulo = '' ) => {
    // Verificar si el correo existe
    const existe= await Articulo.findOne({ codigo:articulo });
    if ( existe ) {
        throw new Error(`El codigo: ${ articulo }, ya está registrado`);
    }
}

export {existeArticuloById, existeArticuloByNombre,existeArticuloByCodigo,existeArticuloByNombreAndId,existeArticuloByIdBoolean}