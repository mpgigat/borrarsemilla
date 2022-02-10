//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const dbConnection=async()=>{
    console.log("Hola",process.env.MONGODB_CNN)
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        })

        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al iniciar la base de datos');
    }
}

export {
    dbConnection
}