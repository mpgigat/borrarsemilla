import Ingreso from '../models/ingreso.js';
import { existeArticuloByIdBoolean } from './db-validators-articulos.js';
import mongoose from 'mongoose'

const existeIngresoById = async (id) => {
    const existe = await Ingreso.findById(id);
    if (!existe) {
        throw new Error(`El id no existe ${id}`);
    }
}



const validarArticulosDetalle=async(detalles)=>{
    for(let detalle of detalles){      
        if(mongoose.Types.ObjectId.isValid(detalle._id)){          
            const existe= await existeArticuloByIdBoolean(detalle._id); 
            if(!existe){
                throw new Error(`El id ${detalle._id} del articulo no existe`);
            }
        }else  throw new Error(`El id ${detalle._id} del articulo no es valido`);
    } 
} 

export {existeIngresoById,validarArticulosDetalle}