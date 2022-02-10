import { response, request } from 'express';
import Ingreso from '../models/ingreso.js'
import Articulo from '../models/articulo.js';



async function aumentarStock(_id,cantidad) {
    let {stock}=await Articulo.findOne({_id});
    stock=parseInt(stock)+parseInt(cantidad);
    const reg=await Articulo.findByIdAndUpdate({_id},{stock})
}

async function disminuirStock(_id,cantidad) {
    let {stock}=await Articulo.findOne({_id});
    stock=parseInt(stock)-parseInt(cantidad);
    const reg=await Articulo.findByIdAndUpdate({_id},{stock})
}

const ingresoGet = async (req, res = response) => {     
    const query=req.query.query;
    console.log(query);
    const ingreso=await Ingreso.find(
        //{$or:[{numcomprobante:new RegExp(query,'i')}]},{}
        {numcomprobante:new RegExp(query,'i')}
        )
        .populate('usuario','nombre')
        .populate('persona','nombre')
        .sort({'createdAt':-1})      
    res.json({ 
        ingreso
    })
}


const ingresoGetById = async (req, res = response) => {
    const { id } = req.params;
    const ingreso = await Ingreso.findOne({_id:id})
        .populate('usuario','nombre')
        .populate('persona','nombre')
    res.json({
        ingreso
    })
}

const ingresoPost = async (req, res) => {
    const {usuario,persona,tipocomprobante,seriecomprobante,numcomprobante,impuesto,total,detalles}=req.body; //raw tipo json
    const ingreso=new Ingreso({usuario,persona,tipocomprobante,seriecomprobante,numcomprobante,impuesto,total,detalles});

    //const ingreso = new ingreso(req.body);
    await ingreso.save();
    
    let detallesN=req.body.detalles;
    detallesN.map( (articulo) =>  aumentarStock(articulo._id,articulo.cantidad));

    res.json({
        ingreso
    })
}

const ingresoPutActivate=async (req, res) => {   
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, {estado:1});

    let detalles=ingreso.detalles;
    detalles.map( (articulo) =>  aumentarStock(articulo._id,articulo.cantidad));

    res.json({
        ingreso
    })
}

const ingresoPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, {estado:0});

    let detalles=ingreso.detalles;
    detalles.map( (articulo) =>  disminuirStock(articulo._id,articulo.cantidad));

    res.json({
        ingreso
    })
}

const ingresoGrafico12Meses=async(req,res)=>{
    const ingreso=await Ingreso.aggregate([
        {
           $group:{
               _id:{
                   mes:{$month:"$createdAt"},
                   year:{$year:"$createdAt"}
               },
               total:{$sum:"$total"},               
               numero:{$sum:1}//acumular de 1 en 1
           }
        },
        {
            $sort:{
                "_id.year":-1,"_id.mes":-1
            }
        }
    ]).limit(12)

    res.json({ 
        ingreso
    })
}

const ingresoConsultaFechas = async (req, res = response) => {     
    let start=req.query.start;
    let end=req.query.end;
     
    const ingreso=await Ingreso.find({"createdAt":{"$gte":start, "$lt":end}})
        .populate('usuario','nombre')
        .populate('persona','nombre')
        .sort({'createdAt':-1})      
    res.json({ 
        ingreso
    })
}


export { ingresoGet, ingresoGetById, ingresoPost, ingresoPutActivate,ingresoPutDeActivate,ingresoGrafico12Meses,ingresoConsultaFechas }