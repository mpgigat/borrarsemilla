import Categoria from '../models/categoria.js';



// const existeCategoriaByNombre = async (categoria = '') => {
//     // Verificar si el correo existe
//     const existe = await Categoria.findOne({ nombre: categoria });
//     if (existe && existe._id !== req.tId) {
//         throw new Error(`La categoria: ${categoria}, ya está registrada`);
//     }
// }

const existeCategoriaByNombre = () => {
    return async (req, res, next) => {
        const existe = await Categoria.findOne({ nombre: req.body.nombre });  
        if (req.method === 'PUT') {
            if (existe && existe._id != req.params.id ) {
                return res.status(401).json({ msg: `Esta categoría ya está registrada!` });
            }
        }else{
            if (existe  ) {
                return res.status(401).json({ msg: `Esta categoría ya está registrada!` });
            }
        }

        next();
    }
}


const existeCategoriaById = async (id) => {

    // Verificar si el correo existe
    const existe = await Categoria.findById(id);
    if (!existe) {
        throw new Error(`El id no existe ${id}`);
    }
}




export {  existeCategoriaById, existeCategoriaByNombre}