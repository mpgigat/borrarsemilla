import mongoose from 'mongoose';
const PersonaSchema = new mongoose.Schema({
    tipopersona: { type:String,maxlength:20, required:true},
    nombre: { type:String,maxlength:50, unique:true, required:true},
    tipodocumento: { type:String,maxlength:20},
    numdocumento: { type:String,maxlength:20},
    direccion: { type:String, maxlength:70},
    telefono: { type:String, maxlength:20},
    email: { type:String, maxlength:50, unique:true},  
    estado: { type:Number, default:1},
    foto:{type:String},
	createdAt: { type: Date, default: Date.now }
});


PersonaSchema.methods.toJSON=function(){
    const {__v, ...persona}=this.toObject(); //nos funciona flecha
    return persona;
}

export default mongoose.model('Persona',PersonaSchema);