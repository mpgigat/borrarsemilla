import { response } from "express";
import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'
import {generarJWT} from "../middlewares/validar-jwt.js";

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos'
            })
        }
        //si esta activo
        if (usuario.estado===0) {
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos'
            })
        }

        //verficar contraseña
        const validPassword=bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/ Password no son correctos'
            })
        }

        //generar jwt
        const token=await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}



export { login }