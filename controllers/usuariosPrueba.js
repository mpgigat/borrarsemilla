// const {response,request}=require('express');
// const bcryptjs=require('bcryptjs')
// const Usuarioprueba =require('../models/usuarioprueba')

import {response,request} from 'express';
import bcryptjs from 'bcryptjs'
import Usuarioprueba from '../models/usuarioprueba.js'

const usuariosPruebaGet = async (req, res=response) => {//para obtener algo de tipado
    //const {param1,param2='por si no viene',page=1}=req.query;   //direcion?param1&param2
    const {limite=5,desde=0}=req.query;
    // const usuarios=await Usuarioprueba.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total=await Usuarioprueba.countDocuments({estado:true});

    const [total,usuarios]=await Promise.all([
        Usuarioprueba.countDocuments({estado:true}),
        Usuarioprueba.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.json({ //llamado ilegal
        total,
        usuarios
    })
}

const usuariosPruebaPost=async (req, res) => {      
    // const body=req.body; //raw tipo json
    // const usuario=new Usuarioprueba(body);

    const {nombre,correo,password,rol}=req.body; //raw tipo json
    const usuario=new Usuarioprueba({nombre,correo,password,rol});

    //encriptar
    const salt=bcryptjs.genSaltSync();//10 por defecto 100 sria mas seguro pero tardria mucho mas
    usuario.password=bcryptjs.hashSync(password,salt);//una sola via

    await usuario.save();

    res.json({         
        usuario
    })
}

const usuariosPruebaPut=async (req, res) => {       
    //const id=req.params.id;     //api/materias/10
    const {id}=req.params;
    const {_id,password,google,correo,...resto}=req.body;

    if(password){
        const salt=bcryptjs.genSaltSync();//10 por defecto 100 sria mas seguro pero tardria mucho mas
        resto.password=bcryptjs.hashSync(password,salt);//una sola via
    }

    const usuario=await Usuarioprueba.findByIdAndUpdate(id,resto);

    res.json({         
        usuario
    })
}

const usuariosPruebaDelete= async (req, res) => {    
    const {id}   = req.params;

    //fisicamente 
    //const usuario=await Usuarioprueba.findByIdAndDelete(id);
    const usuario=await Usuarioprueba.findByIdAndUpdate(id,{estado:false});


    res.json({ //llamado ilegal
        usuario
    })
}


export {usuariosPruebaGet,usuariosPruebaPost,usuariosPruebaPut,usuariosPruebaDelete}