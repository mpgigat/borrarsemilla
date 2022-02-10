//require('dotenv').config();
//import {} from 'dotenv/config.js'
//import dotenv from 'dotenv'
import {} from "dotenv/config.js"

//dotenv.config()
import {Server} from './models/server.js'
//const Server=require('./models/server');

const server= new Server();

server.listen();

 
