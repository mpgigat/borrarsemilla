import { response, request } from 'express';
import subirArchivo from '../helpers/subir-archivo.js';

import Persona from '../models/persona.js'
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import cloudinary from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL)


const personaGet = async (req, res = response) => {     
    const query=req.query.query;  
    const persona=await Persona.find({$or:[
        {nombre:new RegExp(query,'i')},
        {numdocumento:new RegExp(query,'i')},
        {telefono:new RegExp(query,'i')},
        {email:new RegExp(query,'i')},

    ]},{})     
        .sort({'createdAt':-1})      
    res.json({ 
        persona
    })
}

const mostrarImagenCloud= async(req,res)=>{
    const {id}=req.params

    try {
        let persona =await Persona.findById(id)
        if(persona.foto){
            return res.json({url:persona.foto})
        }
        res.status(400).json({msg:'Falta Imagen'})
    } catch (error) {
        res.status(400).json({error})
    }
}

const mostrarImagen= async (req,res)=>{
    const {id}=req.params

    try {
        let persona= await Persona.findById(id)
        if(persona.foto){
            const __dirname=path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage=path.join(__dirname,'../uploads/',persona.foto);
            if(fs.existsSync(pathImage)){
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({msg:'Falta Imagen'})
    } catch (error) {
        res.status(400).json({error})
    }
}

const personaGetClientes = async (req, res = response) => {    
    const query=req.query.query;
    const persona=await Persona.find({tipopersona:'Cliente',$or:[
            {nombre:new RegExp(query,'i')},
            {numdocumento:new RegExp(query,'i')},
            {telefono:new RegExp(query,'i')},
            {email:new RegExp(query,'i')},            
        ]},{})     
        .sort({'createdAt':-1})      
    res.json({ 
        persona
    })
}


const personaGetProveedores = async (req, res = response) => {     
    const query=req.query.query;
    const persona=await Persona.find({tipopersona:'Proveedor',$or:[
            {nombre:new RegExp(query,'i')},
            {numdocumento:new RegExp(query,'i')},
            {telefono:new RegExp(query,'i')},
            {email:new RegExp(query,'i')},
            
        ]},{})     
        .sort({'createdAt':-1})      
    res.json({ 
        persona
    })
}

const personaGetById = async (req, res = response) => {
    const { id } = req.params;
    const persona = await Persona.findOne({_id:id})       
    res.json({
        persona
    })
}

const personaPost = async (req, res) => {

    const {tipopersona,nombre,tipodocumento,numdocumento,direccion,telefono,email,foto}=req.body; //raw tipo json
    const persona=new Persona({tipopersona,nombre,tipodocumento,numdocumento,direccion,telefono,email,foto});

    //const persona = new persona(req.body);
    await persona.save();

    res.json({
        persona
    })
}

const cargarArchivoCloud=async(req,res)=>{
    const {id}=req.params;
    try {
        //subir archivo
        
        const {tempFilePath}=req.files.archivo
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

        //persona a la cual pertenece la foto
        let persona =await Persona.findById(id);
        if(persona.foto){
            console.log(persona.foto);
            const nombreTemp=persona.foto.split('/')   
            const nombreArchivo=nombreTemp[nombreTemp.length-1] // hgbkoyinhx9ahaqmpcwl jpg
            const [public_id] = nombreArchivo.split('.')
            cloudinary.uploader.destroy(public_id)
        }
        persona = await Persona.findByIdAndUpdate(id,{foto: secure_url})
        //responder
        res.json({secure_url});
    } catch (error) {
        res.status(400).json({error,'general':'Controlador'})
    }
}

const cargarArchivo=async(req,res)=>{
    const {id}=req.params;
    try {
        //subir archivo
        console.log(id);
        const nombre= await  subirArchivo(req.files,undefined);
        //persona a la cual pertenece la foto
        let persona =await Persona.findById(id);
        if(persona.foto){
            console.log(persona.foto);
            const __dirname=path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage=path.join(__dirname,'../uploads/',persona.foto);
            if(fs.existsSync(pathImage)){
                console.log('Existe archivo');
                fs.unlinkSync(pathImage)
            }            
        }
        persona = await Persona.findByIdAndUpdate(id,{foto: nombre})
        //responder
        res.json({nombre});
    } catch (error) {
        res.status(400).json({error,'general':'Controlador'})
    }

}


const personaPut = async (req, res) => {   
    const { id } = req.params;
    const { _id, createdAt,estado, ...resto } = req.body;

    const persona = await Persona.findByIdAndUpdate(id, resto);

    res.json({
        persona
    })
}

const personaPutActivate=async (req, res) => {   
    const { id } = req.params;
    const persona = await Persona.findByIdAndUpdate(id, {estado:1});

    res.json({
        persona
    })
}

const personaPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const persona = await Persona.findByIdAndUpdate(id, {estado:0});

    res.json({
        persona
    })
}

const personaDelete = async (req, res) => {
   const { id } = req.params;
   
   const persona=await Persona.findByIdAndDelete(id);
   
    res.json({ 
        persona
    })
}


export {mostrarImagenCloud,cargarArchivoCloud,mostrarImagen,cargarArchivo, personaGet, personaGetById, personaPost, personaPut, personaDelete,personaPutActivate,personaPutDeActivate,personaGetClientes,personaGetProveedores }