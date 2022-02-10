//const { Schema, model } = require('mongoose');
import mongoose  from 'mongoose';

const RolSchema = mongoose.Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


//module.exports = model( 'Rol', RolSchema );

export default mongoose.model('Rol',RolSchema);