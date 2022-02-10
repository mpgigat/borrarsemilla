//const {Router} = require('express');
import {Router} from 'express'
//const {usuariosPruebaGet,usuariosPruebaPost,usuariosPruebaPut,usuariosPruebaDelete}=require('../controllers/usuariosPrueba');
import {usuariosPruebaGet,usuariosPruebaPost,usuariosPruebaPut,usuariosPruebaDelete} from '../controllers/usuariosPrueba.js';
// const {check}=require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { esRolValido,emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { esRolValido,emailExiste, existeUsuarioPorId } from '../helpers/db-validator-usuariosprueba.js';

const router=Router();



router.get('/',usuariosPruebaGet);

router.post('/',[    
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ), //check('rol').custom( (rol) => esRolValido(rol) )
    validarCampos
],    usuariosPruebaPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),    
    validarCampos
],usuariosPruebaPut);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPruebaDelete);

export default router