import { response, request } from 'express';
import Articulo from '../models/articulo.js'

const articuloGet = async (req, res = response) => {   
   
    const query=req.query.query;
    const articulo=await Articulo.find({$or:[
            {nombre:new RegExp(query,'i')},
            {descripcion:new RegExp(query,'i')},
        ]},{})//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
        .populate('categoria','nombre')
        .sort({'createdAt':-1})  //descendente  1 para ascendente
    //const articulo=await articulo.find({},{nombre:1});//solo muestra el nombre
    res.json({ 
        articulo
    })
}


const articuloGetById = async (req, res = response) => {

    const { id } = req.params;
    const articulo = await Articulo.findOne({_id:id})
        .populate('categoria','nombre');
    res.json({
        articulo
    })
}

const articuloGetByCodigo = async (req, res = response) => {
    const  codigo  = req.query.codigo;
    const articulo = await Articulo.findOne({codigo})
        .populate('categoria','nombre');
    res.json({
        articulo
    })
}

const articuloPost = async (req, res) => {

    const {codigo,categoria,nombre,descripcion,precioventa,stock}=req.body; //raw tipo json
    const articulo=new Articulo({codigo,categoria,nombre,descripcion,precioventa,stock});

    //const articulo = new Articulo(req.body);
    await articulo.save();

    res.json({
        articulo
    })
}

const articuloPut = async (req, res) => {   
    const { id } = req.params;  
    const { _id, createdAt,estado, ...resto } = req.body;
    //const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},{articulo:req.body.articulo,codigo:req.body.codigo,nombre:req.body.nombre,descripcion:req.body.descripcion,precio_venta:req.body.precio_venta,stock:req.body.stock});
    const articulo = await Articulo.findByIdAndUpdate(id, resto);

    res.json({
        articulo
    })
}

const articuloPutActivate=async (req, res) => {   
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, {estado:1});

    res.json({
        articulo
    })
}

const articuloPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, {estado:0});

    res.json({
        articulo
    })
}

const articuloDelete = async (req, res) => {
   const { id } = req.params;
   
   const articulo=await Articulo.findByIdAndDelete(id);
   
    res.json({ 
        articulo
    })
}


export { articuloGet, articuloGetById, articuloPost, articuloPut, articuloDelete,articuloPutActivate,articuloPutDeActivate,articuloGetByCodigo }