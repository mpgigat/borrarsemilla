//const {Schema,model}=require('mongoose');
import mongoose from 'mongoose';

const UsuarioSchema=mongoose.Schema({
    rol:{
        type:String,
        required:true,
        maxlength:20
    },
    nombre:{
        type:String,
        required:true,
        maxlength:50,        
    },
    tipodocumento:{
        type:String,
        maxlength:20
    },
    numdocumento:{
        type:String,
        maxlength:20
    },
    direccion:{
        type:String,
        maxlength:20
    },
    telefono:{
        type:String,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }    ,       
    estado:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

UsuarioSchema.methods.toJSON=function(){
    const {__v, password,...usuario}=this.toObject(); //nos funciona flecha
    return usuario;
}

//module.exports=model('Usuarioprueba',UsuariopruebaSchema);
export default mongoose.model('Usuario',UsuarioSchema);