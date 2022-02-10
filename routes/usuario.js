
import {Router} from 'express'
import {usuarioGet,usuarioPost,usuarioPut,usuarioDelete,usuarioPutDeActivate,usuarioPutActivate, usuarioGetById} from '../controllers/usuario.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeEmail, existeUsuarioPorId } from '../helpers/db-validators-usuarios.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import {validarAdminRol,validarVariosRoles} from '../middlewares/validar-roles.js';

const router=Router();

router.get('/',[
    validarJWT,
    validarAdminRol, 
    validarCampos   
],usuarioGet);

router.get('/:id',[
    validarJWT,
    validarAdminRol, 
    validarCampos   
],usuarioGetById);

router.post('/',[    
    validarJWT,
    validarAdminRol,
    check('rol', 'El rol es obligatorio!').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    existeEmail(),
    validarCampos       
],    usuarioPost);
       
router.put('/:id',[
    validarJWT,
    validarAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId), 
    existeEmail(),
    validarCampos
],usuarioPut);

router.put('/activate/:id',[
    validarJWT,
    validarAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuarioPutActivate);

router.put('/deactivate/:id',[
    validarJWT,
    validarAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuarioPutDeActivate);

router.delete('/:id',[
    validarJWT,
    validarAdminRol,
    //validarVariosRoles('ADMIN','VENTAS'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuarioDelete);

export default router