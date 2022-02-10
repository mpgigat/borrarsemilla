import { response } from 'express'
import jwt from 'jsonwebtoken'
import Usuario from "../models/usuario.js";
import { existeUsuarioPorId } from '../helpers/db-validators-usuarios.js';

const validarJWT = async(req,res=response,next)=>{
    const token=req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        //la funcion si da error dispara un thown new werro por eso el try
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuario=await Usuario.findById({_id:uid});

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido '//- usuario no existe DB
            })
        }

        // Verificar si el uid tiene estado true
        if ( usuario.estado ==0) {
            return res.status(401).json({
                msg: 'Token no válido ' //- usuario con estado: false
            })
        }
        req.usuario=usuario;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }   
}

async function checkToken(token){
    let __id=null;
    try {
        const{_id}=await jwt.decode(token);
        __id=_id;
    } catch (error) {
        return false;
    }
    const existeUsuario=existeUsuarioPorId(__id);  
    console.log(existeUsuario);

    ////FALTAIRIA MAS ... RESTO EN FULLSTACT video 23
}

const generarJWT=( uid='')=>{//identificador unico de usuario
    return new Promise((resolve,reject)=>{
        checkToken();
        const payload={uid};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'//4h
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}



export  {validarJWT,generarJWT}