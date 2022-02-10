import { response, request } from 'express';
import Venta from '../models/venta.js'
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

const ventaGet = async (req, res = response) => {     
    const query=req.query.query;
    console.log(query);
    const venta=await Venta.find(
        //{$or:[{numcomprobante:new RegExp(query,'i')}]},{}
        {numcomprobante:new RegExp(query,'i')}
        )
        .populate('usuario','nombre')
        .populate('persona','nombre')
        .sort({'createdAt':-1})      
    res.json({ 
        venta
    })
}


const ventaGetById = async (req, res = response) => {
    const { id } = req.params;
    const venta = await Venta.findOne({_id:id})
        .populate('usuario','nombre')
        .populate('persona','nombre')
    res.json({
        venta
    })
}

const ventaPost = async (req, res) => {
    const {usuario,persona,tipocomprobante,seriecomprobante,numcomprobante,impuesto,total,detalles}=req.body; //raw tipo json
    const venta=new Venta({usuario,persona,tipocomprobante,seriecomprobante,numcomprobante,impuesto,total,detalles});

    //const venta = new venta(req.body);
    await venta.save();
    
    let detallesN=req.body.detalles;
    detallesN.map( (articulo) =>  disminuirStock(articulo._id,articulo.cantidad));

    res.json({
        venta
    })
}

const ventaPutActivate=async (req, res) => {   
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, {estado:1});

    let detalles=venta.detalles;
    detalles.map( (articulo) =>  disminuirStock(articulo._id,articulo.cantidad));

    res.json({
        venta
    })
}

const ventaPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, {estado:0});

    let detalles=venta.detalles;
    detalles.map( (articulo) =>  aumentarStock(articulo._id,articulo.cantidad));

    res.json({
        venta
    })
}

const ventaGrafico12Meses=async(req,res)=>{
    const venta=await Venta.aggregate([
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
        venta
    })
}

const ventaConsultaFechas = async (req, res = response) => {     
    let start=req.query.start;
    let end=req.query.end;
     
    const venta=await Venta.find({"createdAt":{"$gte":start, "$lt":end}})
        .populate('usuario','nombre')
        .populate('persona','nombre')
        .sort({'createdAt':-1})      
    res.json({ 
        venta
    })
}

export { ventaGet, ventaGetById, ventaPost, ventaPutActivate,ventaPutDeActivate,ventaGrafico12Meses,ventaConsultaFechas }