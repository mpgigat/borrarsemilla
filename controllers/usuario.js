import {response,request} from 'express';
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario.js'

const usuarioGet = async (req, res=response) => {//para obtener algo de tipado
    const query=req.query.query;
    const usuarios=await Usuario.find({$or:[
            {nombre:new RegExp(query,'i')},
            {numdocumento:new RegExp(query,'i')},
        ]},{})//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves       
    
    res.json({ 
        usuarios
    })
}


const usuarioGetById = async (req, res = response) => {
    const { id } = req.params;
    const usuarios = await Usuario.findOne({_id:id});
    res.json({
        usuarios
    })
}

const login = async (req, res=response) => {//para obtener algo de tipado
    const usuarios =await  Usuario.find();
                
    res.json({ //llamado ilegal
        total,
        usuarios
    })
}

const usuarioPost=async (req, res) => {   
    const {nombre,tipodocumento,numdocumento,direccion,telefono,email,password,rol}=req.body; //raw tipo json
    const usuario=new Usuario({nombre,tipodocumento,numdocumento,direccion,telefono,email,password,rol});

    //encriptar
    const salt=bcryptjs.genSaltSync();//10 por defecto 100 sria mas seguro pero tardria mucho mas
    usuario.password=bcryptjs.hashSync(password,salt);//una sola via

    await usuario.save();

    res.json({         
        usuario
    })
}

const usuarioPut=async (req, res) => {       
    const {id}=req.params;
    const {_id,email,estado,password,...resto}=req.body;

    if(password){
        const salt=bcryptjs.genSaltSync();//10 por defecto 100 sria mas seguro pero tardria mucho mas
        resto.password=bcryptjs.hashSync(password,salt);//una sola viaw
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto);

    res.json({         
        usuario
    })
}

const usuarioPutActivate=async (req, res) => {   
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:1});

    res.json({
        usuario
    })
}

const usuarioPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:0});

    res.json({
        usuario
    })
}


const usuarioDelete= async (req, res) => {    
    const {id}   = req.params;

    const usuario=await Usuario.findByIdAndRemove(id);    
   // const usuarioAutenticado=req.usuario

    res.json({ 
        usuario//,usuarioAutenticado
    })
}




export {usuarioGet,usuarioPost,usuarioPut,usuarioDelete,usuarioPutDeActivate,usuarioPutActivate,usuarioGetById}