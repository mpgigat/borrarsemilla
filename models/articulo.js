//const {Schema,model}=require('mongoose');
import mongoose from 'mongoose';

const ArticuloSchema=mongoose.Schema({
    categoria:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria',required:true,    },
    codigo:{type:String,       maxlength:64,required:true    },   
    nombre:{type:String,       maxlength:50,unique:true,required:true    },   
    descripcion:{type:String,       maxlength:255    },    
    precioventa:{type:Number,       required:true,default:0},   
    stock:{type:Number,       default:0    },   
    foto:{type:String,        },   
    estado:{type:Number,default:1    },
    createdAt:{type:Date,default:Date.now   },
    
})

ArticuloSchema.methods.toJSON=function(){
    const {__v, ...articulo}=this.toObject(); //nos funciona flecha
    return articulo;
}

export default mongoose.model('Articulo',ArticuloSchema);