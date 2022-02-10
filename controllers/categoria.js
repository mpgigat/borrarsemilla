import { response, request } from 'express';
import Categoria from '../models/categoria.js'

const categoriaGet = async (req, res = response) => {     
    const query=req.query.query;
    const categoria=await Categoria.find({$or:[
            {nombre:new RegExp(query,'i')},
            {descripcion:new RegExp(query,'i')},
        ]})//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
        .sort({'createdAt':-1})  //descendente  1 para ascendente
    //const categoria=await Categoria.find({},{nombre:1});//solo muestra el nombre
    res.json({ 
        categoria
    })
}


const categoriaGetById = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findOne({_id:id});
    res.json({
        categoria
    })
}

const categoriaPost = async (req, res) => {
    const {nombre,descripcion}=req.body; //raw tipo json
    const categoria = new Categoria({nombre,descripcion});
    await categoria.save();

    res.json({
        categoria
    })
}

const categoriaPut = async (req, res) => {   
    const { id } = req.params;
    const { _id, createdAt,estado, ...resto } = req.body;

    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        categoria
    })
}

const categoriaPutActivate=async (req, res) => {   
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:1});

    res.json({
        categoria
    })
}

const categoriaPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:0});

    res.json({
        categoria
    })
}

const categoriaDelete = async (req, res) => {
   const { id } = req.params;
   
   const categoria=await Categoria.findByIdAndDelete(id);
   
    res.json({ 
        categoria
    })
}


export { categoriaGet, categoriaGetById, categoriaPost, categoriaPut,categoriaPutActivate, categoriaDelete ,categoriaPutDeActivate}