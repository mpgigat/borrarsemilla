//const {Schema,model}=require('mongoose');
import mongoose from 'mongoose';

const CategoriaSchema=mongoose.Schema({
    nombre:{type:String,required:[true,'El nombre es obligatorio'],maxlength:50,unique:true    },
    descripcion:{type:String,       maxlength:255    },    
    estado:{type:Number,default:1    },
    createdAt:{type:Date,default:Date.now    },
    
})

CategoriaSchema.methods.toJSON=function(){
    const {__v, ...categoria}=this.toObject(); //nos funciona flecha
    return categoria;
}

export default mongoose.model('Categoria',CategoriaSchema);