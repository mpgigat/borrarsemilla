//const express=require('express');
import  express from 'express'
//const cors=require('cors');
import cors from 'cors'
//const { dbConnection } = require('../database/config');
import {dbConnection} from '../database/config.js';
import fileUpload from 'express-fileupload'

//rutas
import usuarioPrueba from '../routes/usuariosPrueba.js' ;
import categoria from '../routes/categoria.js'
import articulo from "../routes/articulo.js";
import usuario from '../routes/usuario.js'
import auth from "../routes/auth.js";
import persona from "../routes/persona.js";
import ingreso from "../routes/ingreso.js";
import venta from "../routes/venta.js";


class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        //midlewares //agregan funcionalidad// se ejecutan al iniciar el servidor
        this.usuariosRoutePath= '/api/usuariosprueba';
        this.categoriaPath=     '/api/categoria';
        this.articuloPath=      '/api/articulo';
        this.usuarioPath=       '/api/usuario';
        this.authPath=          '/api/auth'
        this.personaPath=       '/api/persona'
        this.ingresoPath=       '/api/ingreso'
        this.ventaPath=         '/api/venta'

        //conectar a bd
        this.conectarDB();

        this.middlewares();

        //ruts de la app
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors());
        
        //parseo y lectura del body
        this.app.use(express.json());

        this.app.use(express.static('public'));    
        
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    routes(){
        //this.app.use(this.usuariosPruebaRoutePath,require('../routes/usuarios'));
        this.app.use(this.usuariosRoutePath,usuarioPrueba);
        this.app.use(this.categoriaPath,categoria);
        this.app.use(this.articuloPath,articulo);
        this.app.use(this.usuarioPath,usuario);
        this.app.use(this.authPath,auth);
        this.app.use(this.personaPath,persona);
        this.app.use(this.ingresoPath,ingreso);
        this.app.use(this.ventaPath,venta);
    }

    listen(){
        this.app.listen(this.port ,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

//module.exports=Server;
export {Server}