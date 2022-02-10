//const {Schema,model}=require('mongoose');
import mongoose from 'mongoose';

const UsuariopruebaSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    }    ,
    correo:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

UsuariopruebaSchema.methods.toJSON=function(){
    const {__v, password,...usuario}=this.toObject(); //nos funciona flecha
    return usuario;
}

//module.exports=model('Usuarioprueba',UsuariopruebaSchema);
export default mongoose.model('Usuarioprueba',UsuariopruebaSchema);