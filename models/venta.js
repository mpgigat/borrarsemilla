import mongoose from 'mongoose';
const VentaSchema = new mongoose.Schema({
    usuario:{type: mongoose.Schema.ObjectId, ref: 'Usuario',required:true },
    persona:{ type: mongoose.Schema.ObjectId, ref: 'Persona',required:true },
    tipocomprobante:{ type:String,maxlength:20,required:true},
    seriecomprobante: { type:String,maxlength:7},
    numcomprobante: { type:String,maxlength:10,required:true},
    impuesto:{ type:Number, required:true},
    total:{ type:Number, required:true},
    detalles: [{
        _id:{
            type:String,
            required:true
        },
        articulo:{
            type:String,
            required:true
        },
        cantidad:{
            type:Number,
            required:true
        },
        precio:{
            type:Number,
            required:true
        },
        descuento:{
            type:Number,
            required:true
        }
    }],
    estado: { type:Number, default:1},
    createdAt: { type: Date, default: Date.now }
});



VentaSchema.methods.toJSON=function(){
    const {__v, ...venta}=this.toObject(); //nos funciona flecha
    return venta;
}

export default mongoose.model('Venta',VentaSchema);